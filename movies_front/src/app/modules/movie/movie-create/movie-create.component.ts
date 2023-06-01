import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Director } from 'src/app/models/director';
import { Genre } from 'src/app/models/genres';
import { MovieDetail } from 'src/app/models/movieDetail';
import { YoutubeTrailer } from 'src/app/models/youtubeTrailer';
import { CountryService } from 'src/app/services/country.service';
import { DirectorService } from 'src/app/services/director.service';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from 'src/app/services/movie.service';
import { TrailerService } from 'src/app/services/trailer.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
})
export class MovieCreateComponent implements OnInit {
  lstGenres: any[] = [];
  lstDirectors: any[] = [];
  lstCountries: any[] = [];
  genresObservable$ = this.genreService.getGenres();
  directorsObservable$ = this.directorService.getDirectors();
  @Output() movieCreated: EventEmitter<void> = new EventEmitter<void>();

  movieFormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    poster: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    country: ['', [Validators.required]],
    releaseDate: ['', [Validators.required]],
    selectedGenre: ['', [Validators.required]],
    selectedDirector: ['', [Validators.required]],
  });

  youtubeTrailerGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    url: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    channel: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private directorService: DirectorService,
    private countryService: CountryService,
    private trailerService: TrailerService,
    private movieService: MovieService,
    private toastr: ToastrService
  ) {
    this.loadCombos();
  }

  ngOnInit() {}

  createMovie = () =>
    this.saveTrailer((result: string) => this.saveMovie(result));

  saveMovie = (trailerID: string) => {
    this.movieService.createMovie(this.getMovieToSave(trailerID)).subscribe({
      next: () => {
        this.resetForms();
        this.movieCreated.emit();
        this.toastr.success('Confirmation', 'Movie was created!');
      },
      error: (error) => console.error(error.message),
    });
  };

  getMovieToSave = (trailerID: string): MovieDetail => {
    const movie = this.movieFormGroup.value as unknown as MovieDetail;
    const director = { id: this.movieFormGroup.value.selectedDirector };
    const genre = { id: this.movieFormGroup.value.selectedGenre };
    const youtubeTrailer = { id: trailerID };
    movie.director = director as Director;
    movie.genre = genre as Genre;
    movie.youtubeTrailer = youtubeTrailer as YoutubeTrailer;
    return movie;
  };

  saveTrailer = (callback: any) => {
    this.trailerService
      .createTrailer(
        this.youtubeTrailerGroup.value as unknown as YoutubeTrailer
      )
      .subscribe({
        next: (response) => callback(response.id),
        error: (error) => console.error(error.message),
      });
  };

  loadCombos = () => {
    Promise.all([this.directorsObservable$, this.genresObservable$]).then(
      (results) => {
        this.setDirectors(results[0]);
        this.setGenres(results[1]);
      }
    );
    this.setCountries();
  };

  setDirectors = (resultDirectors: any) =>
    resultDirectors.subscribe((values: any) => (this.lstDirectors = values));

  setGenres = (resultGenres: any) =>
    resultGenres.subscribe((values: any) => (this.lstGenres = values));

  setCountries = () => (this.lstCountries = this.countryService.getCountries());

  resetForms = () => {
    this.movieFormGroup.reset();
    this.youtubeTrailerGroup.reset();
  };
}
