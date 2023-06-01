import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectorDetail } from 'src/app/models/directorDetail';
import { Movie } from 'src/app/models/movie';
import { MovieDetail } from 'src/app/models/movieDetail';
import { MovieService } from 'src/app/services/movie.service';
import { DirectorService } from 'src/app/services/director.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrls: ['./director-detail.component.css'],
})
export class DirectorDetailComponent implements OnInit, OnChanges {
  public flagImage: string = '';
  directorId!: string;
  @Input() directorDetail!: DirectorDetail;
  @Output() movieSelectedEvent = new EventEmitter<Movie>();
  selectedMovie: MovieDetail | undefined;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private movieService: MovieService,
    private directorService: DirectorService
  ) {}

  onMovieSelected(movie: Movie): void {
    this.movieSelectedEvent.emit(movie);
    this.getMovieDetails(movie);
  }

  getMovieDetails(movie: Movie): void {
    this.movieService.getMovieDetail(movie).subscribe((movieDetail) => {
      this.selectedMovie = movieDetail;
    });
  }

  formatDate(date: Date | string): string {
    const parsedDate = new Date(date);
    const options = { timeZone: 'UTC' };
    return new Intl.DateTimeFormat('es-CO', options).format(parsedDate);
  }

  getFlagUrl(country: string): void {
    this.flagImage = this.countryService.getFlag(country);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.directorDetail && changes.directorDetail.currentValue) {
      this.getFlagUrl(this.directorDetail.nationality);
    }
  }

  getDirector() {
    this.directorService.getDirector(this.directorId).subscribe((director) => {
      this.directorDetail = director;
      this.getFlagUrl(this.directorDetail.nationality);
    });
  }

  ngOnInit() {
    if (this.directorDetail === undefined) {
      this.directorId = this.route.snapshot.paramMap.get('id')!;
      if (this.directorId) {
        this.getDirector();
      }
    }
  }
}
