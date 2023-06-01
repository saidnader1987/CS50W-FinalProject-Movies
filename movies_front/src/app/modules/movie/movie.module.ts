import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { PopularityComponent } from './popularity/popularity.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MovieListComponent,
    MovieDetailComponent,
    PopularityComponent,
    MovieCreateComponent,
  ],
  exports: [MovieListComponent, MovieDetailComponent, PopularityComponent],
})
export class MovieModule {}
