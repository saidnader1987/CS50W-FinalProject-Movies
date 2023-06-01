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
import { ActorDetail } from 'src/app/models/actorDetail';
import { Movie } from 'src/app/models/movie';
import { MovieDetail } from 'src/app/models/movieDetail';
import { MovieService } from 'src/app/services/movie.service';
import { ActorService } from 'src/app/services/actor.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css'],
})
export class ActorDetailComponent implements OnInit, OnChanges {
  public flagImage: string = '';
  actorId!: string;
  @Input() actorDetail!: ActorDetail;
  @Output() movieSelectedEvent = new EventEmitter<Movie>();
  selectedMovie: MovieDetail | undefined;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private movieService: MovieService,
    private actorService: ActorService
  ) {}

  onMovieSelected(movie: Movie): void {
    this.movieSelectedEvent.emit(movie);
    this.getMovieDetails(movie);
  }

  formatDate(date: Date | string): string {
    const parsedDate = new Date(date);
    const options = { timeZone: 'UTC' };
    return new Intl.DateTimeFormat('es-CO', options).format(parsedDate);
  }

  getMovieDetails(movie: Movie): void {
    this.movieService.getMovieDetail(movie).subscribe((movieDetail) => {
      this.selectedMovie = movieDetail;
    });
  }

  getFlagUrl(country: string): void {
    this.flagImage = this.countryService.getFlag(country);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.actorDetail && changes.actorDetail.currentValue) {
      this.getFlagUrl(this.actorDetail.nationality);
    }
  }

  getActor() {
    this.actorService.getActor(this.actorId).subscribe((actor) => {
      this.actorDetail = actor;
      this.getFlagUrl(this.actorDetail.nationality);
    });
  }

  ngOnInit() {
    if (this.actorDetail === undefined) {
      this.actorId = this.route.snapshot.paramMap.get('id')!;
      if (this.actorId) {
        this.getActor();
      }
    }
  }
}
