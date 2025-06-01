import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IComment } from 'src/interfaces/icomment';
import { CommentService } from 'src/services/comment.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  form!: FormGroup;
  comments!: IComment[];
  selected: IComment | null = null;

  constructor(private service: CommentService, private fb: FormBuilder) {
    this.form = this.fb.group({
      comments: ['', Validators.required],
      userId: ['', Validators.required],
      recipeId: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.service.getAll().subscribe((data: IComment[]) => {
      this.comments = data;
    });
  }

  select(item: IComment): void {
    this.selected = { ...item };
    this.form.patchValue({
      comments: item.comments,
      userId: item.userId,
      recipeId: item.recipeId,
      isActive: item.isActive
    });
  }

  create(item: IComment): void {
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
        this.selected.comments = this.form.value.comments;
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
