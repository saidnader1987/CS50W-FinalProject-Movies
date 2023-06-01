import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieDetail } from 'src/app/models/movieDetail';
import { MoviePlatform, Platform } from 'src/app/models/platform';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-platform-detail',
  templateUrl: './platform-detail.component.html',
  styleUrls: ['./platform-detail.component.css'],
})
export class PlatformDetailComponent implements OnInit, OnChanges {
  @Input() platformDetail!: Platform;
  selectedMovieDetail: MovieDetail | undefined;

  constructor(private movieService: MovieService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Platforms', this.platformDetail);
  }

  ngOnInit(): void {}

  onSelectMovie(selectedMovie: MoviePlatform) {
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
