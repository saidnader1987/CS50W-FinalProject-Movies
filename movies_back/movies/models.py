# from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# class User(AbstractUser):
#     pass


class Person(models.Model):
    name = models.CharField(max_length=50)
    photo = models.CharField(max_length=500)
    nationality = models.CharField(max_length=255)
    birthDate = models.DateTimeField()
    biography = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.name}"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "photo": self.photo,
            "nationality": self.nationality,
            "birthDate": self.birthDate.strftime("%b %d %Y, %I:%M %p"),
            "biography": self.biography
        }

    def serializeDetail(self):
        return {
            **self.serialize(),
            "movies": [movie.serialize() for movie in self.movies.all()]
        }


class Director(Person):
    pass


class Actor(Person):
    pass


class Genre(models.Model):
    genreType = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.genreType}"

    def serialize(self):
        return {
            "id": self.id,
            "type": self.genreType,
        }

    def serializeDetail(self):
        return {
            **self.serialize(),
            "movies": [movie.serialize() for movie in self.movies.all()]
        }


class Platform(models.Model):
    name = models.CharField(max_length=50)
    url = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.name}"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
        }

    def serializeDetail(self):
        return {
            **self.serialize(),
            "movies": [movie.serialize() for movie in self.movies.all()]
        }


class Review(models.Model):
    text = models.CharField(max_length=500)
    score = models.IntegerField(validators=[
                                MinValueValidator(1), MaxValueValidator(5)])
    creator = models.CharField(max_length=50)
    movie = models.ForeignKey(
        "Movie", on_delete=models.CASCADE, related_name="reviews")

    def __str__(self):
        return f"{self.movie}: {self.score} by {self.creator}"

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "score": self.score,
            "creator": self.creator,
        }


class YoutubeTrailer(models.Model):
    name = models.CharField(max_length=50)
    url = models.CharField(max_length=500)
    duration = models.IntegerField()
    channel = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "duration": self.duration,
            "channel": self.channel
        }


class Movie(models.Model):

    title = models.CharField(max_length=255)
    poster = models.CharField(max_length=500)
    duration = models.IntegerField()
    country = models.CharField(max_length=255)
    releaseDate = models.DateTimeField()
    # popularity = models.IntegerField(
    #     blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    director = models.ForeignKey(
        "Director", on_delete=models.CASCADE, related_name="movies"
    )
    actors = models.ManyToManyField(
        "Actor", blank=True, related_name="movies"
    )
    genre = models.ForeignKey(
        "Genre", on_delete=models.CASCADE, related_name="movies"
    )
    platforms = models.ManyToManyField(
        "Platform", blank=True, related_name="movies"
    )
    youtubeTrailer = models.OneToOneField(
        "YoutubeTrailer", related_name="movie", on_delete=models.CASCADE, unique=True
    )

    def __str__(self):
        return f"{self.title}"

    def computePopularity(self):
        reviewSum = sum([review.score for review in self.reviews.all()])
        reviewCount = len(self.reviews.all())
        try:
            popularity = round(reviewSum / reviewCount, 0)
        except ZeroDivisionError:
            popularity = 0
        return popularity

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "poster": self.poster,
            "duration": self.duration,
            "country": self.country,
            "releaseDate": self.releaseDate.strftime("%b %d %Y, %I:%M %p"),
            "popularity": self.computePopularity()
        }

    def serializeDetail(self):
        return {
            **self.serialize(),
            "director": self.director.serialize(),
            "actors": [actor.serialize() for actor in self.actors.all()],
            "genre": self.genre.serialize(),
            "platforms": [platform.serialize() for platform in self.platforms.all()],
            "reviews": [review.serialize() for review in self.reviews.all()],
            "youtubeTrailer": self.youtubeTrailer.serialize()
        }
