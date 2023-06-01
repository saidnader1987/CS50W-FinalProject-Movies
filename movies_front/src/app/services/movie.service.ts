import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../models/genres';
import { environment } from 'src/environments/environment';
import { MovieDetail } from '../models/movieDetail';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiGenresUrl: string = environment.baseUrl + 'genres';
  private apiMovieDetailUrl: string = environment.baseUrl + 'movies/';
  private apiCreateMovie: string = environment.baseUrl + 'movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiGenresUrl);
  }

  getMovieDetail(movie: Movie): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(this.apiMovieDetailUrl + movie.id);
  }

  getMovieDetailById(movieId: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(this.apiMovieDetailUrl + movieId);
  }

  createMovie(movie: MovieDetail): Observable<MovieDetail> {
    return this.http.post<MovieDetail>(this.apiCreateMovie, movie);
  }
}
