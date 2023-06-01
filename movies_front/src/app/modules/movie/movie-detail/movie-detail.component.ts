import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MovieDetail } from 'src/app/models/movieDetail';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActorService } from 'src/app/services/actor.service';
import { ActorDetail } from 'src/app/models/actorDetail';
import { MovieService } from 'src/app/services/movie.service';
import { ReviewService } from 'src/app/services/review.service';
import { PlatformService } from 'src/app/services/platform.service';
import { Platform } from 'src/app/models/platform';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent {
  addActorForm!: FormGroup;
  addPlatformForm!: FormGroup;
  addReviewForm!: FormGroup;
  nonAssignedActors: ActorDetail[] = [];
  nonAssignedPlatforms: Platform[] = [];
  @Input() movieDetail: MovieDetail | undefined;
  @Output() reviewCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private actorService: ActorService,
    private platformService: PlatformService,
    private movieService: MovieService,
    private reviewService: ReviewService,
    private sanitizer: DomSanitizer
  ) {}

  addReview = () => {
    this.reviewService
      .saveReview(this.movieDetail?.id, this.addReviewForm.value)
      .subscribe({
        next: (response: any) => {
          if (this.movieDetail) {
            this.movieDetail.popularity = response?.popularity;
          }
          this.loadReviews();
          this.reviewCreated.emit();
          this.toastr.success('Confirmation', 'Review added');
          this.addReviewForm.reset();
        },
        error: (e) => console.log('💥💥💥💥💥💥💥💥', e),
      });
  };

  loadReviews = () => {
    this.reviewService.getReviews(this.movieDetail?.id).subscribe({
      next: (response) => {
        console.log(response);
        this.movieDetail != undefined
          ? (this.movieDetail.reviews = response)
          : [];
      },
      error: (e) => console.log('💥💥💥💥💥💥💥💥', e),
    });
  };

  addActor(actorId: string, movieId: string | undefined) {
    if (movieId) {
      this.actorService.addActorToMovie(actorId, movieId).subscribe(() => {
        this.toastr.success('Confirmation', 'Actor added');
        this.addActorForm.reset();
        this.getMovieDetails(movieId);
      });
    }
  }

  addPlatform(platformId: string, movieId: string | undefined) {
    if (movieId) {
      this.platformService
        .addPlatformToMovie(platformId, movieId)
        .subscribe(() => {
          this.toastr.success('Confirmation', 'Platform added');
          this.addPlatformForm.reset();
          this.getMovieDetails(movieId);
        });
    }
  }

  closeModal() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }

  extractLastName = (fullName: string): string => {
    const parts = fullName.split(' ');
    return parts[1]; // assumes second string is last name
  };

  sortActors(actors: ActorDetail[]): ActorDetail[] {
    return this.getSortedLastNameActors(actors);
  }

  getSortedLastNameActors = (actors: any) => {
    return actors.sort((a: any, b: any) => {
      const aLastName = this.extractLastName(a.name);
      const bLastName = this.extractLastName(b.name);
      return aLastName.localeCompare(bLastName);
    });
  };

  extractFirstName = (fullName: string): string => {
    const parts = fullName.split(' ');
    return parts[0]; // assumes second string is last name
  };

  sortPlatforms(actors: Platform[]): Platform[] {
    return this.getSortedActors(actors);
  }

  getSortedActors = (actors: any) => {
    return actors.sort((a: any, b: any) => {
      const aLastName = this.extractFirstName(a.name);
      const bLastName = this.extractFirstName(b.name);
      return aLastName.localeCompare(bLastName);
    });
  };

  actorValidator(
    control: FormControl
  ): { [validation: string]: boolean } | null {
    if (
      control.value &&
      !this.nonAssignedActors.some(
        (actor) => actor.id.toString() === control.value.toString()
      )
    ) {
      return { invalidActor: true };
    }
    return null;
  }

  platformValidator(
    control: FormControl
  ): { [validation: string]: boolean } | null {
    if (
      control.value &&
      !this.nonAssignedPlatforms.some(
        (platform) => platform.id.toString() === control.value.toString()
      )
    ) {
      return { invalidPlatform: true };
    }
    return null;
  }

  getYouTubeID(youtubeUrl: string): string {
    let videoId = '';

    if (youtubeUrl.indexOf('watch?v=') !== -1) {
      videoId = youtubeUrl.split('watch?v=')[1].split('&')[0];
    }

    return videoId;
  }

  getYouTubeEmbedUrl(
    youtubeUrl: string | undefined | null
  ): Observable<SafeResourceUrl> {
    if (!youtubeUrl) {
      return of(this.sanitizer.bypassSecurityTrustResourceUrl(''));
    }

    const videoId = this.getYouTubeID(youtubeUrl);
    const embedUrl = 'https://www.youtube.com/embed/' + videoId;
    return of(this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl));
  }

  getActors() {
    this.actorService.getActors().subscribe({
      next: (actors) => {
        this.nonAssignedActors = this.sortActors(actors).filter(
          (actorDetail) => {
            return this.movieDetail?.actors.every(
              (actor) => actor.id !== actorDetail.id
            );
          }
        );
        if (this.nonAssignedActors.length > 0) {
          this.addActorForm.controls['actor'].setValue(
            this.nonAssignedActors[0].id
          );
        }
      },
      error: (e) => console.log('💥💥💥💥💥💥💥💥', e),
    });
  }

  getPlatforms() {
    this.platformService.getPlatforms().subscribe({
      next: (platform) => {
        this.nonAssignedPlatforms = this.sortPlatforms(platform).filter(
          (platformDetail) => {
            return this.movieDetail?.platforms.every(
              (response) => response.id !== platformDetail.id
            );
          }
        );
        if (this.nonAssignedPlatforms.length > 0) {
          this.addPlatformForm.controls['name'].setValue(
            this.nonAssignedPlatforms[0].id
          );
        }
      },
      error: (e) => console.log('💥💥💥💥💥💥💥💥', e),
    });
  }

  getMovieDetails(movieId: string) {
    this.movieService.getMovieDetailById(movieId).subscribe((movieDetail) => {
      this.movieDetail = movieDetail;
      this.getActors();
      this.getPlatforms();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.movieDetail && changes.movieDetail.currentValue) {
      this.getActors();
      this.getPlatforms();
    }
  }

  cancelCreation() {
    this.addActorForm.reset();
    this.addPlatformForm.reset();
  }

  ngOnInit() {
    this.initForms();
  }

  initForms = () => {
    this.addActorForm = this.formBuilder.group({
      actor: [null, [Validators.required, this.actorValidator.bind(this)]],
    });
    this.addPlatformForm = this.formBuilder.group({
      name: [null, [Validators.required, this.platformValidator.bind(this)]],
    });

    this.addReviewForm = this.formBuilder.group({
      text: [null, [Validators.required]],
      score: [null, [Validators.required]],
      creator: [null, [Validators.required]],
    });
  };
}
