import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreListComponent } from './genre-list/genre-list.component';

const routes: Routes = [
  {
    path: 'genres',
    children: [
      {
        path: 'list',
        component: GenreListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenreRoutingModule {}
