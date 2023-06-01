import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformListComponent } from './platform-list/platform-list.component';

const routes: Routes = [
  {
    path: 'platforms',
    children: [
      {
        path: 'list',
        component: PlatformListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformRoutingModule {}
