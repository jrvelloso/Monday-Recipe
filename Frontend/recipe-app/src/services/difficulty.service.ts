import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDifficulty } from 'src/interfaces/idifficulty';

@Injectable({ providedIn: 'root' })
export class DifficultyService {
  private apiUrl = 'https://localhost:7048/api/Difficulty';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IDifficulty[]> {
    return this.http.get<IDifficulty[]>(this.apiUrl);
  }

  getById(id: number): Observable<IDifficulty> {
    return this.http.get<IDifficulty>(`${this.apiUrl}/GetById?id=${id}`);
  }

  create(difficulty: IDifficulty): Observable<IDifficulty> {
    return this.http.post<IDifficulty>(this.apiUrl, difficulty);
  }

  update(id: number, difficulty: IDifficulty): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}?id=${id}`, difficulty);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
}
