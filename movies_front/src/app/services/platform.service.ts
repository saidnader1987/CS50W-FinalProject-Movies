import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Platform } from '../models/platform';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private apiUrl: string = environment.baseUrl + 'platforms';

  constructor(private http: HttpClient) { }

  getPlatforms(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl)
  }

  savePlaform(platform: Platform){
    return this.http.post(this.apiUrl, platform)
  }

  addPlatformToMovie(PlatformId: string, movieId: string): Observable<any> {
    const url = `${this.apiUrl}/${PlatformId}/movies/${movieId}`;
    return this.http.post<any>(url, {});
  }
}
