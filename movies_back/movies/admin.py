from django.contrib import admin

from .models import Director, Actor, Movie, Genre, Platform, Review, YoutubeTrailer


class PersonAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "nationality",
                    "birthDate", "biography")


class GenreAdmin(admin.ModelAdmin):
    list_display = ("id", "genreType")


class PlatformAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


class MovieAdmin(admin.ModelAdmin):
    filter_horizontal = ("actors",)
    list_display = ("id", "title", "duration", "country",
                    "releaseDate", "director", "genre", "youtubeTrailer")


class YoutubeTrailerAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "duration", "channel")


admin.site.register(Director, PersonAdmin)
admin.site.register(Actor, PersonAdmin)
admin.site.register(Movie, MovieAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Platform, PlatformAdmin)
admin.site.register(Review)
admin.site.register(YoutubeTrailer, YoutubeTrailerAdmin)
