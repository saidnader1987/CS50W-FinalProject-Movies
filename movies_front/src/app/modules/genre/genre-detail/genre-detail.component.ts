import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Genre, MovieGenre } from 'src/app/models/genre';
import { Movie } from 'src/app/models/movie';
import { MovieDetail } from 'src/app/models/movieDetail';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrls: ['./genre-detail.component.css'],
})
export class GenreDetailComponent implements OnInit, OnChanges {
  @Input() genreDetail!: Genre;
  selectedMovieDetail: MovieDetail | undefined;
  constructor(private movieService: MovieService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Genre detail', this.genreDetail);
  }

  ngOnInit(): void {
    console.log('Genre details', this.genreDetail);
  }

  onSelectMovie(selectedMovie: MovieGenre) {
    var movie = new Movie(
      selectedMovie.id,
      selectedMovie.title,
      selectedMovie.poster,
      selectedMovie.duration,
      selectedMovie.country,
      new Date(selectedMovie.releaseDate),
      selectedMovie.popularity
    );

    this.movieService.getMovieDetail(movie).subscribe({
      next: (movieDetail) => {
        this.selectedMovieDetail = movieDetail;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
