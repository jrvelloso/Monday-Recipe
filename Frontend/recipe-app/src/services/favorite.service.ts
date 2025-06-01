import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFavorite } from 'src/interfaces/ifavorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'https://localhost:7048/api/favorite'; // Adjust API URL as needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<IFavorite[]> {
    return this.http.get<IFavorite[]>(this.apiUrl);
  }

  create(favorite: IFavorite): Observable<IFavorite> {
    return this.http.post<IFavorite>(this.apiUrl, favorite);
  }

  update(id: number, favorite: IFavorite): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, favorite);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
