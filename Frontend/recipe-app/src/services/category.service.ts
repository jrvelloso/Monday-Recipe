import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/interfaces/icategory';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'https://localhost:7048/api/Category';
  // private apiUrl = 'https://api.recipeapp.com/categories'; // Example URL, replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiUrl}/GetById?id=${id}`);
  }


  createCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.apiUrl, category);
  }


  updateCategory(id: number, category: ICategory): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}?id=${id}`, category);
  }


  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
}
