import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { YoutubeTrailer } from '../models/youtubeTrailer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrailerService {

  private apiCreateTrailer: string = environment.baseUrl + 'youtube-trailers';

  constructor(private http: HttpClient) { }

  createTrailer (trailer: YoutubeTrailer): Observable<YoutubeTrailer> {
    return this.http.post<YoutubeTrailer>(this.apiCreateTrailer, trailer);
  }

}
