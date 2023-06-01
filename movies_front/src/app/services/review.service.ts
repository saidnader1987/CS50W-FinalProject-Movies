import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiBase: string = environment.baseUrl + 'movies/';

  constructor(private http: HttpClient) {}

  getReviews(id: any): Observable<Review[]> {
    return this.http.get<any[]>(this.apiBase + id + '/reviews');
  }

  saveReview(movieId: any, review: Review) {
    return this.http.post(this.apiBase + movieId + '/reviews', review);
  }
}
