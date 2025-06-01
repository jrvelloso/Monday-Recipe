import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IRating } from 'src/interfaces/irating';
import { RatingService } from 'src/services/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  form!: FormGroup;
  ratings!: IRating[];
  selected: IRating | null = null;

  constructor(private service: RatingService, private fb: FormBuilder) {
    this.form = this.fb.group({
      ratingValue: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      userId: ['', Validators.required],
      recipeId: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.service.getAll().subscribe((data: IRating[]) => {
      this.ratings = data;
    });
  }

  select(item: IRating): void {
    this.selected = { ...item };
    this.form.patchValue({
      ratingValue: item.ratingValue,
      userId: item.userId,
      recipeId: item.recipeId,
      isActive: item.isActive
    });
  }

  create(item: IRating): void {
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
        this.selected.ratingValue = this.form.value.ratingValue;
        this.selected.userId = this.form.value.userId;
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
