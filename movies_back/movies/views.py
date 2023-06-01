from django.http import HttpResponse
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


import json

from .models import *
from .helpers import *

# Create your views here.


def index(request):
    return HttpResponse("Hello, world!")


def actor(request, actor_id):
    if request.method == "GET":
        # Query for requested actor
        try:
            actor = Actor.objects.get(pk=actor_id)
            return JsonResponse(actor.serializeDetail())
        except Actor.DoesNotExist:
            return JsonResponse({"error": "Actor not found."}, status=404)
    # Actor must be via GET
    else:
        return JsonResponse({
            "error": "GET request required."
        }, status=400)


@csrf_exempt
def actors(request):
    # Creating a new actor
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        photo = data.get("photo")
        nationality = data.get("nationality")
        birthDate = data.get("birthDate")
        biography = data.get("biography")
        # Check to see if post data has the needed structure
        if not name or not photo or not nationality or not birthDate or not biography:
            return JsonResponse({"message": "Structure of post data not valid"}, status=404)
        # Check to see if name already in database
        try:
            name_check = Actor.objects.get(name=name)
            if name_check:
                return JsonResponse({"message": "Actor already exists"}, status=404)
        except Actor.DoesNotExist:
            pass
        # Validate image url
        if not validate_image(photo):
            return JsonResponse({"message": "Please provide a valid image url"}, status=404)
        # Validate date
        if not validate_date(birthDate):
            return JsonResponse({"message": "Please provide a valid date. It should be before today"}, status=404)
        # Add actor
        actor = Actor(**data)
        actor.save()
        return JsonResponse({"message": "Actor created"}, status=200)
    elif request.method == "GET":
        actors = Actor.objects.all()
        return JsonResponse([actor.serializeDetail() for actor in actors], safe=False)


def director(request, director_id):
    if request.method == "GET":
        # Query for requested director
        try:
            director = Director.objects.get(pk=director_id)
            return JsonResponse(director.serializeDetail())
        except Director.DoesNotExist:
            return JsonResponse({"error": "Director not found."}, status=404)
    # Director must be via GET
    else:
        return JsonResponse({
            "error": "GET request required."
        }, status=400)


@csrf_exempt
def directors(request):
    # Creating a new director
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        photo = data.get("photo")
        nationality = data.get("nationality")
        birthDate = data.get("birthDate")
        biography = data.get("biography")
        # Check to see if post data has the needed structure
        if not name or not photo or not nationality or not birthDate or not biography:
            return JsonResponse({"message": "Structure of post data not valid"}, status=404)
        # Check to see if name already in database
        try:
            name_check = Director.objects.get(name=name)
            if name_check:
                return JsonResponse({"message": "Director already exists"}, status=404)
        except Director.DoesNotExist:
            pass
        # Validate image url
        if not validate_image(photo):
            return JsonResponse({"message": "Please provide a valid image url"}, status=404)
        # Validate date
        if not validate_date(birthDate):
            return JsonResponse({"message": "Please provide a valid date. It should be before today"}, status=404)
        # Add director
        director = Director(**data)
        director.save()
        return JsonResponse({"message": "Director created"}, status=200)
    elif request.method == "GET":
        directors = Director.objects.all()
        return JsonResponse([director.serializeDetail() for director in directors], safe=False)


@csrf_exempt
def genre(request, genre_id):
    if request.method == "GET":
        # Query for requested genre
        try:
            genre = Genre.objects.get(pk=genre_id)
            return JsonResponse(genre.serializeDetail())
        except Genre.DoesNotExist:
            return JsonResponse({"error": "Genre not found."}, status=404)
    # Genre must be via GET
    else:
        return JsonResponse({
            "error": "GET request required."
        }, status=400)


@csrf_exempt
def genres(request):
    # Creating a new genre
    if request.method == "POST":
        data = json.loads(request.body)
        genre_type = data.get("type")
        # Check to see if post data has the needed structure
        if not genre_type:
            return JsonResponse({"message": "Structure of post data not valid"}, status=404)
        # Check to see if genre already in database
        try:
            genre_type_check = Genre.objects.get(genreType=genre_type)
            if genre_type_check:
                return JsonResponse({"message": "Genre already exists"}, status=404)
        except Genre.DoesNotExist:
            pass
        # Add genre
        genre = Genre(genreType=genre_type)
        genre.save()
        return JsonResponse({"message": "Genre created"}, status=200)
    elif request.method == "GET":
        genres = Genre.objects.all()
        return JsonResponse([genre.serializeDetail() for genre in genres], safe=False)


def platform(request, platform_id):
    if request.method == "GET":
        # Query for requested platform
        try:
            platform = Platform.objects.get(pk=platform_id)
            return JsonResponse(platform.serializeDetail())
        except Platform.DoesNotExist:
            return JsonResponse({"error": "Platform not found."}, status=404)
    # Platform must be via GET
    else:
        return JsonResponse({
            "error": "GET request required."
        }, status=400)


@csrf_exempt
def platforms(request):
    # Creating a new platform
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        url = data.get("url")
        # Check to see if post data has the needed structure
        if not name or not url:
            return JsonResponse({"message": "Structure of post data not valid"}, status=404)
        # Check to see if platform already in database
        try:
            name_check = Platform.objects.get(name=name)
            if name_check:
                return JsonResponse({"message": "Platform already exists"}, status=404)
        except Platform.DoesNotExist:
            pass
        # Validate url
        if not validate_url(url):
            return JsonResponse({"message": "Please provide a valid url"}, status=404)
        # Add platform
        platform = Platform(**data)
        platform.save()
        return JsonResponse({"message": "Platform created"}, status=200)
    elif request.method == "GET":
        platforms = Platform.objects.all()
        return JsonResponse([platform.serializeDetail() for platform in platforms], safe=False)


def movie(request, movie_id):
    if request.method == "GET":
        # Query for requested movie
        try:
            movie = Movie.objects.get(pk=movie_id)
            return JsonResponse(movie.serializeDetail())
        except Movie.DoesNotExist:
            return JsonResponse({"error": "Movie not found."}, status=404)
    # Platform must be via GET
    else:
        return JsonResponse({
            "error": "GET request required."
        }, status=400)


@csrf_exempt
def movies(request):
    # Creating a new movie
    if request.method == "POST":
        data = json.loads(request.body)
        title = data.get("title")
        poster = data.get("poster")
        duration = data.get("duration")
        country = data.get("country")
        releaseDate = data.get("releaseDate")
        if (genre_data := data.get('genre')) is not None and 'id' in genre_data:
            genre_id = genre_data['id']
        else:
            genre_id = None
        if (director_data := data.get('director')) is not None and 'id' in director_data:
            director_id = director_data['id']
        else:
            director_id = None
        if (youtube_data := data.get('youtubeTrailer')) is not None and 'id' in youtube_data:
            youtubeTrailer_id = youtube_data['id']
        else:
            youtubeTrailer_id = None
        # Check to see if post data has the needed structure
        if not title or not poster or not duration or not country or not releaseDate or not genre_id or not director_id or not youtubeTrailer_id:
            return JsonResponse({"message": "Structure of post data not valid"}, status=404)
        # Check to see if title already in database
        try:
            title_check = Movie.objects.get(title=title)
            if title_check:
                return JsonResponse({"message": "Movie already exists"}, status=404)
        except Movie.DoesNotExist:
            pass
        # Validate poster url
        if not validate_image(poster):
            return JsonResponse({"message": "Please provide a valid poster url"}, status=404)
        # Validate duration (positive integer)
        if not is_valid_positive_integer(duration):
            return JsonResponse({"message": "Duration must be a positive integer"}, status=404)
        # Validate date
        if not validate_date(releaseDate):
            return JsonResponse({"message": "Please provide a valid release date. It should be before today"}, status=404)
        # Validate genre
        try:
            genre = Genre.objects.get(pk=genre_id)
        except Genre.DoesNotExist:
            return JsonResponse({"message": "Genre does not exist in database"}, status=404)
        # Validate director
        try:
            director = Director.objects.get(pk=director_id)
        except Director.DoesNotExist:
            return JsonResponse({"message": "Director does not exist in database"}, status=404)
        # Validate youtube trailer
        try:
            youtubeTrailer = YoutubeTrailer.objects.get(pk=youtubeTrailer_id)
        except YoutubeTrailer.DoesNotExist:
            return JsonResponse({"message": "YoutubeTrailer does not exist in database"}, status=404)
        # Add Movie
        movie = Movie(title=title, poster=poster, duration=duration, country=country,
                      releaseDate=releaseDate, genre=genre, director=director, youtubeTrailer=youtubeTrailer)
        movie.save()
        return JsonResponse({"message": "Movie created"}, status=200)
    elif request.method == "GET":
        movies = Movie.objects.all()
        return JsonResponse([movie.serializeDetail() for movie in movies], safe=False)


@csrf_exempt
def reviews(request, movie_id):
    # Creating a new review
    if request.method == "POST":
        data = json.loads(request.body)
        text = data.get("text")
        score = data.get("score")
        creator = data.get("creator")
        if not text or not score or not creator:
            return JsonResponse({"message": "Structure of post data not valid"}, status=404)
        # Validate movie
        try:
            movie = Movie.objects.get(pk=movie_id)
        except Movie.DoesNotExist:
            return JsonResponse({"message": "Movie does not exist in database"}, status=404)
        # validate numerical positive score
        if not is_valid_score(score):
            return JsonResponse({"message": "Score must be between 1 and 5"}, status=404)
        # create review
        review = Review(**data, movie=movie)
        review.save()
        return JsonResponse({"popularity": movie.computePopularity(), "message": "Review created"}, status=200)
    elif request.method == "GET":
        # Query for requested movie
        try:
            movie = Movie.objects.get(pk=movie_id)
            reviews = movie.reviews.all()
            return JsonResponse([review.serialize() for review in reviews], safe=False)
        except Movie.DoesNotExist:
            return JsonResponse({"error": "Movie not found."}, status=404)


@csrf_exempt
def youtube_trailers(request):
    # Creating a new youtube trailer
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        url = data.get("url")
        duration = data.get("duration")
        channel = data.get("channel")
        # Check to see if post data has the needed structure
        if not name or not url or not duration or not channel:
            return JsonResponse({"message": "Structure of post data not valid"}, status=404)
        # Check to see if platform already in database
        try:
            name_check = YoutubeTrailer.objects.get(name=name)
            if name_check:
                return JsonResponse({"message": "Trailer's name already exists"}, status=404)
        except YoutubeTrailer.DoesNotExist:
            pass
        # Validate url
        if not validate_youtube_url(url):
            return JsonResponse({"message": "Please provide a valid youtube url"}, status=404)
        # Validate duration (positive integer)
        if not is_valid_positive_integer(duration):
            return JsonResponse({"message": "Duration must be a positive integer"}, status=404)
        # Add trailer
        youtube_trailer = YoutubeTrailer(**data)
        youtube_trailer.save()
        trailer_id = youtube_trailer.id
        return JsonResponse({"id": trailer_id, "message": "Trailer created"}, status=200)
    else:
        return JsonResponse({
            "error": "POST request required."
        }, status=400)


@csrf_exempt
def add_actor_to_movie(request, actor_id, movie_id):
    if request.method == "POST":
        # Validate actor
        try:
            actor = Actor.objects.get(pk=actor_id)
        except Actor.DoesNotExist:
            return JsonResponse({"message": "Actor does not exist in database"}, status=404)
        # Validate movie
        try:
            movie = Movie.objects.get(pk=movie_id)
        except Movie.DoesNotExist:
            return JsonResponse({"message": "Movie does not exist in database"}, status=404)
        # Add actor to movie
        movie.actors.add(actor)
        return JsonResponse({"message": "Actor added"}, status=200)
    else:
        return JsonResponse({
            "error": "POST request required."
        }, status=400)


@csrf_exempt
def add_platform_to_movie(request, platform_id, movie_id):
    if request.method == "POST":
        # Validate platform
        try:
            platform = Platform.objects.get(pk=platform_id)
        except Platform.DoesNotExist:
            return JsonResponse({"message": "Platform does not exist in database"}, status=404)
        # Validate movie
        try:
            movie = Movie.objects.get(pk=movie_id)
        except Movie.DoesNotExist:
            return JsonResponse({"message": "Movie does not exist in database"}, status=404)
        # Add platform to movie
        movie.platforms.add(platform)
        return JsonResponse({"message": "Platform added"}, status=200)
    else:
        return JsonResponse({
            "error": "POST request required."
        }, status=400)
