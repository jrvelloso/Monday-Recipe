import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIngredients } from 'src/interfaces/icategory';

@Injectable({ providedIn: 'root' })
export class IngredientsService {
  private apiUrl = 'https://localhost:7048/api/Ingredient';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IIngredients[]> {
    return this.http.get<IIngredients[]>(this.apiUrl);
  }

  getById(id: number): Observable<IIngredients> {
    return this.http.get<IIngredients>(`${this.apiUrl}/GetById?id=${id}`);
  }


  create(ingredients: IIngredients): Observable<IIngredients> {
    return this.http.post<IIngredients>(this.apiUrl, ingredients);
  }


  update(id: number, ingredients: IIngredients): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}?id=${id}`, ingredients);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
}
