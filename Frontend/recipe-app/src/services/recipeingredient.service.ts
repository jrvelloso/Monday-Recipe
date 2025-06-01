import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipeIngredient } from 'src/interfaces/irecipeingredient';

@Injectable({
  providedIn: 'root'
})
export class RecipeIngredientService {
  private apiUrl = 'https://localhost:7048/api/RecipeIngredient'; // Adjust API URL as needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<IRecipeIngredient[]> {
    return this.http.get<IRecipeIngredient[]>(this.apiUrl);
  }

  create(recipeIngredient: IRecipeIngredient): Observable<IRecipeIngredient> {
    return this.http.post<IRecipeIngredient>(this.apiUrl, recipeIngredient);
  }

  update(id: number, recipeIngredient: IRecipeIngredient): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, recipeIngredient);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
