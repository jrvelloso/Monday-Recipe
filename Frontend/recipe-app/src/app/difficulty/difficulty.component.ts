import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDifficulty } from 'src/interfaces/idifficulty';
import { DifficultyService } from 'src/services/difficulty.service';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.css']
})
export class DifficultyComponent implements OnInit {

  Form!: FormGroup;
  selected: IDifficulty | null = null;
  difficulties: IDifficulty[] = [];

  constructor(private service: DifficultyService, private fb: FormBuilder) {
    this.Form = this.fb.group({
      name: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.service.getAll().subscribe((data: IDifficulty[]) => {
      this.difficulties = data;
    });
  }

  select(item: IDifficulty): void {
    this.selected = { ...item };
    this.Form.patchValue({
      name: item.name,
      isActive: item.isActive
    });
  }

  create(item: IDifficulty): void {
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
    if (this.Form.valid) {
      if (this.selected) {
        this.selected.name = this.Form.value.name;
        this.selected.isActive = this.Form.value.isActive;
        this.update();
      } else {
        this.create(this.Form.value);
      }
    }
  }

  clearForm() {
    this.Form.reset();
    this.selected = null;
  }
}
