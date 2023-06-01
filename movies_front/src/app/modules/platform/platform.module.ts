import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformListComponent } from './platform-list/platform-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatformDetailComponent } from './platform-detail/platform-detail.component';
import { MovieModule } from '../movie/movie.module';
import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformCreateComponent } from './platform-create/platform-create.component';

@NgModule({
  declarations: [
    PlatformListComponent,
    PlatformDetailComponent,
    PlatformCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MovieModule,
    PlatformRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [PlatformListComponent],
})
export class PlatformModule {}
