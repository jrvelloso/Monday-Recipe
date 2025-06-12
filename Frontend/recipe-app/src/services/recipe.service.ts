import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from 'src/interfaces/irecipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://localhost:7048/api/Recipe'; // Adjust API URL as needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.apiUrl);
  }

  getById(id: number): Observable<IRecipe> {
    return this.http.get<IRecipe>(`${this.apiUrl}/GetById?id=${id}`);
  }

  create(recipe: IRecipe): Observable<IRecipe> {
    return this.http.post<IRecipe>(this.apiUrl, recipe);
  }

  update(id: number, recipe: IRecipe): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}?id=${id}`, recipe);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
