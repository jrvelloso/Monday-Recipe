import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRecipe } from 'src/interfaces/irecipe';
import { RecipeService } from 'src/services/recipe.service';
import { CategoryService } from 'src/services/category.service';
import { DifficultyService } from 'src/services/difficulty.service';
import { AuthService } from 'src/services/auth.service';
import { ICategory } from 'src/interfaces/icategory';
import { IDifficulty } from 'src/interfaces/idifficulty';
import { IUser } from 'src/interfaces/iuser';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  form!: FormGroup;
  recipes!: IRecipe[];
  selected: IRecipe | null = null;
  categories: ICategory[] = [];
  difficulties: IDifficulty[] = [];
  currentUser: IUser | null = null;

  constructor(
    private service: RecipeService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private difficultyService: DifficultyService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      preparationTime: ['', Validators.required],
      categoryId: ['', Validators.required],
      difficultyId: ['', Validators.required],
      userId: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.form.patchValue({ userId: user.id });
      }
      this.fetch();
      this.loadCategories();
      this.loadDifficulties();
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: ICategory[]) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadDifficulties(): void {
    this.difficultyService.getAll().subscribe({
      next: (data: IDifficulty[]) => {
        this.difficulties = data;
      },
      error: (error) => {
        console.error('Error loading difficulties:', error);
      }
    });
  }

  fetch(): void {
    this.service.getAll().subscribe((data: IRecipe[]) => {
      if (this.currentUser) {
        this.recipes = data.filter(recipe => recipe.userId === this.currentUser?.id);
      } else {
        this.recipes = [];
      }
    });
  }

  select(item: IRecipe): void {
    this.selected = { ...item };
    this.form.patchValue({
      title: item.title,
      description: item.description,
      preparationTime: item.preparationTime,
      categoryId: item.categoryId,
      difficultyId: item.difficultyId,
      userId: item.userId,
      isActive: item.isActive
    });
  }

  create(item: IRecipe): void {
    this.service.create(item).subscribe(() => {
      this.fetch();
      this.clearForm();
    });
  }

  update(): void {
    if (this.selected) {
      this.service.update(this.selected.id, this.selected).subscribe(() => {
        this.fetch();
        this.clearForm();
      });
    }
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(() => {
      this.fetch();
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.selected) {
        this.selected.title = this.form.value.title;
        this.selected.description = this.form.value.description;
        this.selected.preparationTime = this.form.value.preparationTime;
        this.selected.categoryId = this.form.value.categoryId;
        this.selected.difficultyId = this.form.value.difficultyId;
        this.selected.userId = this.form.value.userId;
        this.selected.isActive = this.form.value.isActive;
        this.update();
      } else {
        this.create(this.form.value);
      }
    }
  }

  clearForm() {
    this.form.reset();
    if (this.currentUser) {
      this.form.patchValue({ userId: this.currentUser.id });
    }
    this.selected = null;
  }
}
