import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRating } from 'src/interfaces/irating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'https://localhost:7048/api/Rating'; // Adjust API URL as needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<IRating[]> {
    return this.http.get<IRating[]>(this.apiUrl);
  }

  create(rating: IRating): Observable<IRating> {
    return this.http.post<IRating>(this.apiUrl, rating);
  }

  update(id: number, rating: IRating): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, rating);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
