import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRecipe } from 'src/interfaces/irecipe';
import { RecipeService } from 'src/services/recipe.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  form!: FormGroup;
  recipes!: IRecipe[];
  selected: IRecipe | null = null;
  recipe: any;

  constructor(private service: RecipeService, private fb: FormBuilder) {
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
    console.log('RecipeComponent initialized');
    this.fetch();
  }

  fetch(): void {
    this.service.getAll().subscribe((data: IRecipe[]) => {
      console.log('Fetched recipes:', data);
      this.recipes = data;
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
    this.selected = null;
  }
}
