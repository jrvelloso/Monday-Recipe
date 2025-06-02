import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/interfaces/icategory';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {

  categoryForm!: FormGroup;
 // categories: any[] = []; // Define your categories array
  selectedCategoryId!: number;
  selectedCategory!: ICategory;
  categories!: ICategory[];


  constructor(private categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder
    ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [false]
    });
   }

  ngOnInit(): void {
      this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    });
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      return this.categories = data;
    });
  }

  selectCategory(category: ICategory): void {
    this.selectedCategory = { ...category };
    this.categoryForm.patchValue({
      name: category.name,
      isActive: category.isActive
    });
    this.selectedCategoryId = category.id;
  }

  createCategory(category: ICategory): void {
    this.categoryService.createCategory(category).subscribe(() => {
      this.fetchCategories();
      this.clearForm();
    });
  }


  updateCategory(): void {
    if (this.selectedCategory) {
      this.categoryService.updateCategory(this.selectedCategory.id, this.selectedCategory).subscribe(() => {
        this.fetchCategories();
        this.clearForm();
      });
    }
  }


  return(): void {
    this.router.navigate(['/home']);
  }



  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.fetchCategories();
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
    if (this.selectedCategory) {
        // Update selectedCategory with form values
        this.selectedCategory.name = this.categoryForm.value.name;
        this.selectedCategory.isActive = this.categoryForm.value.isActive;
        this.updateCategory();
      } else {
        this.createCategory(this.categoryForm.value);
      }
    }
  }

  clearForm() {
    this.categoryForm.reset();
    this.selectedCategory = {} as ICategory;
  }

}
