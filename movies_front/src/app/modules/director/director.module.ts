import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DirectorDetailComponent } from './director-detail/director-detail.component';
import { DirectorListComponent } from './director-list/director-list.component';
import { MovieModule } from '../movie/movie.module';
import { RouterModule } from '@angular/router';
import { DirectorRoutingModule } from './director-routing.module';
import { DirectorCreateComponent } from './director-create/director-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MovieModule,
    RouterModule,
    DirectorRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DirectorListComponent,
    DirectorDetailComponent,
    DirectorCreateComponent,
  ],
  exports: [DirectorListComponent],
})
export class DirectorModule {}
