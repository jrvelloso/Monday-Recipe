import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from 'src/interfaces/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategorySelectionService {
  private selectedCategorySource = new BehaviorSubject<ICategory | null>(null);
  selectedCategory$ = this.selectedCategorySource.asObservable();

  selectCategory(category: ICategory | null): void {
    this.selectedCategorySource.next(category);
  }
}
