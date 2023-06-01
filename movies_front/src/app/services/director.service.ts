import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DirectorDetail } from '../models/directorDetail';
import { Director } from '../models/director';

@Injectable({
  providedIn: 'root',
})
export class DirectorService {
  private apiUrl: string = environment.baseUrl + 'directors';

  constructor(private http: HttpClient) {}

  getDirectors(): Observable<DirectorDetail[]> {
    return this.http.get<DirectorDetail[]>(this.apiUrl);
  }

  createDirector(director: Director): Observable<Director> {
    return this.http.post<Director>(this.apiUrl, director);
  }

  getDirector(id: string): Observable<DirectorDetail> {
    return this.http.get<DirectorDetail>(this.apiUrl + '/' + id);
  }
}
