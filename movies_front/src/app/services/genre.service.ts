import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/genres';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private apiUrl: string = environment.baseUrl + 'genres';

  constructor(private http: HttpClient) { }

  getGenres(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl)
  }

  saveGenre(genre: Genre){
    return this.http.post(this.apiUrl, genre)
  }
}
