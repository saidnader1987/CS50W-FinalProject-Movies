import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreListComponent } from './genre-list/genre-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';
import { MovieModule } from '../movie/movie.module';
import { GenreRoutingModule } from './genre-routing.module';
import { GenreCreateComponent } from './genre-create/genre-create.component';

@NgModule({
  declarations: [
    GenreListComponent,
    GenreDetailComponent,
    GenreCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MovieModule,
    GenreRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [GenreListComponent],
})
export class GenreModule {}
