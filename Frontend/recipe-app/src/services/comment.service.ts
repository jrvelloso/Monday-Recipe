import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from 'src/interfaces/icomment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://localhost:7048/api/Comment'; // Adjust API URL as needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.apiUrl);
  }

  create(comment: IComment): Observable<IComment> {
    return this.http.post<IComment>(this.apiUrl, comment);
  }

  update(id: number, comment: IComment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, comment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
