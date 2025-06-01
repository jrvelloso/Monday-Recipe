import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IRecipeIngredient } from 'src/interfaces/irecipeingredient';
import { RecipeIngredientService } from 'src/services/recipeingredient.service';

@Component({
  selector: 'app-recipeingredient',
  templateUrl: './recipeingredient.component.html',
  styleUrls: ['./recipeingredient.component.css']
})
export class RecipeIngredientComponent implements OnInit {

  form!: FormGroup;
  recipeIngredients!: IRecipeIngredient[];
  selected: IRecipeIngredient | null = null;

  constructor(private service: RecipeIngredientService, private fb: FormBuilder) {
    this.form = this.fb.group({
      amount: ['', Validators.required],
      measurementTypeId: ['', Validators.required],
      ingredientId: ['', Validators.required],
      recipeId: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.service.getAll().subscribe((data: IRecipeIngredient[]) => {
      this.recipeIngredients = data;
    });
  }

  select(item: IRecipeIngredient): void {
    this.selected = { ...item };
    this.form.patchValue({
      amount: item.amount,
      measurementTypeId: item.measurementTypeId,
      ingredientId: item.ingredientId,
      recipeId: item.recipeId,
      isActive: item.isActive
    });
  }

  create(item: IRecipeIngredient): void {
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
        this.selected.amount = this.form.value.amount;
        this.selected.measurementTypeId = this.form.value.measurementTypeId;
        this.selected.ingredientId = this.form.value.ingredientId;
        this.selected.recipeId = this.form.value.recipeId;
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
