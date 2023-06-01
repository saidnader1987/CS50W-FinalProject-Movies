import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActorModule } from './modules/actor/actor.module';
import { DirectorModule } from './modules/director/director.module';
import { MovieModule } from './modules/movie/movie.module';
import { GenreModule } from './modules/genre/genre.module';
import { PlatformModule } from './modules/platform/platform.module';
import { HttpErrorInterceptorService } from './interceptors/http-error-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MovieModule,
    ActorModule,
    DirectorModule,
    HttpClientModule,
    GenreModule,
    PlatformModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
  ],
})
export class AppModule {}
