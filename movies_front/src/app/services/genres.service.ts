import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private apiUrl: string = environment.baseUrl + 'genres';
  constructor() {}
}
