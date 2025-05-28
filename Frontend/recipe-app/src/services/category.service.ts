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
}


//www.recipeapp.com
