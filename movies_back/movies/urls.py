from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    # API Routes
    path("actors", views.actors, name="actors"),
    path("actors/<int:actor_id>", views.actor, name="actor"),
    path("directors", views.directors, name="directors"),
    path("directors/<int:director_id>", views.director, name="director"),
    path("genres", views.genres, name="genres"),
    path("genres/<int:genre_id>", views.genre, name="genre"),
    path("platforms", views.platforms, name="platforms"),
    path("platforms/<int:platform_id>", views.platform, name="platform"),
    path("movies", views.movies, name="movies"),
    path("movies/<int:movie_id>", views.movie, name="movie"),
    path("movies/<int:movie_id>/reviews", views.reviews, name="reviews"),
    path("youtube-trailers", views.youtube_trailers, name="youtube_trailers"),
    path("actors/<int:actor_id>/movies/<int:movie_id>",
         views.add_actor_to_movie, name="add_actor_to_movie"),
    path("platforms/<int:platform_id>/movies/<int:movie_id>",
         views.add_platform_to_movie, name="add_platform_to_movie"),
]
