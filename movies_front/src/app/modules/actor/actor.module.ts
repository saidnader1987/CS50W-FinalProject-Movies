import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { MovieModule } from '../movie/movie.module';
import { RouterModule } from '@angular/router';
import { ActorRoutingModule } from './actor-routing.module';
import { ActorCreateComponent } from './actor-create/actor-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MovieModule,
    ActorRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [ActorListComponent],
  declarations: [
    ActorDetailComponent,
    ActorListComponent,
    ActorCreateComponent,
  ],
})
export class ActorModule {}
