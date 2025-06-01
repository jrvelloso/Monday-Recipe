import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IRecipeCategory } from 'src/interfaces/irecipecategory';
import { RecipeCategoryService } from 'src/services/recipecategory.service';

@Component({
  selector: 'app-recipecategory',
  templateUrl: './recipecategory.component.html',
  styleUrls: ['./recipecategory.component.css']
})
export class RecipeCategoryComponent implements OnInit {

  form!: FormGroup;
  recipeCategories!: IRecipeCategory[];
  selected: IRecipeCategory | null = null;

  constructor(private service: RecipeCategoryService, private fb: FormBuilder) {
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.service.getAll().subscribe((data: IRecipeCategory[]) => {
      this.recipeCategories = data;
    });
  }

  select(item: IRecipeCategory): void {
    this.selected = { ...item };
    this.form.patchValue({
      categoryId: item.categoryId,
      isActive: item.isActive
    });
  }

  create(item: IRecipeCategory): void {
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
        this.selected.categoryId = this.form.value.categoryId;
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
