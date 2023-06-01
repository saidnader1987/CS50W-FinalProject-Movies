import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieDetail } from 'src/app/models/movieDetail';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  @ViewChild('movieModal') movieModal: any;
  movieTypes: any;
  isError: boolean = false;
  selectedMovieDetail: MovieDetail | undefined;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  updateView(): void {
    this.getMovies();
  }

  sortedMovies = (movies: any) => {
    return movies.sort((a: any) => {
      const type = a.type;
      return type.localeCompare(type);
    });
  };

  getMovies = () => {
    this.movieService.getMovies().subscribe({
      next: (movies) => (this.movieTypes = this.sortedMovies(movies)),
      error: (error) => console.error(error),
    });
  };

  onSelectMovie(selectedMovie: Movie) {
    this.movieService.getMovieDetail(selectedMovie).subscribe({
      next: (movieDetail) => {
        this.selectedMovieDetail = movieDetail;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  closeModal = (modal: any) => {
    this.movieModal.nativeElement.classList.remove('show');
    this.movieModal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    this.getMovies();
  };
}
