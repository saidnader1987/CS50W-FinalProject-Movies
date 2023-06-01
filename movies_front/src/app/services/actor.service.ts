import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ActorDetail } from '../models/actorDetail';
import { Actor } from '../models/actor';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private apiUrl: string = environment.baseUrl + 'actors';

  constructor(private http: HttpClient) {}

  getActors(): Observable<ActorDetail[]> {
    return this.http.get<ActorDetail[]>(this.apiUrl);
  }

  createActor(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>(this.apiUrl, actor);
  }

  addActorToMovie(actorId: string, movieId: string): Observable<any> {
    const url = `${this.apiUrl}/${actorId}/movies/${movieId}`;
    return this.http.post<any>(url, {});
  }

  getActor(id: string): Observable<ActorDetail> {
    return this.http.get<ActorDetail>(this.apiUrl + '/' + id);
  }
}
