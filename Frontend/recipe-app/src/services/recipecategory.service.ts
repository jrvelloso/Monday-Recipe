import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipeCategory } from 'src/interfaces/irecipecategory';

@Injectable({
  providedIn: 'root'
})
export class RecipeCategoryService {
  private apiUrl = 'https://localhost:7048/api/RecipeCategory'; // Adjust API URL as needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<IRecipeCategory[]> {
    return this.http.get<IRecipeCategory[]>(this.apiUrl);
  }

  create(recipeCategory: IRecipeCategory): Observable<IRecipeCategory> {
    return this.http.post<IRecipeCategory>(this.apiUrl, recipeCategory);
  }

  update(id: number, recipeCategory: IRecipeCategory): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, recipeCategory);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
