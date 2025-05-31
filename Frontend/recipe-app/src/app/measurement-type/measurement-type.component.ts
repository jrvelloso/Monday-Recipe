import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMeasurementType } from 'src/interfaces/imeasurementType';
import { MeasurementTypeService } from 'src/services/measurement-type.service';

@Component({
  selector: 'app-measurement-type',
  templateUrl: './measurement-type.component.html',
  styleUrls: ['./measurement-type.component.css']
})
export class MeasurementTypeComponent implements OnInit {

  Form!: FormGroup;
  selected: IMeasurementType | null = null;
  measurementTypes!: IMeasurementType[];

  constructor(private service: MeasurementTypeService, private fb: FormBuilder) {
    this.Form = this.fb.group({
      name: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.service.getAll().subscribe((data: IMeasurementType[]) => {
      this.measurementTypes = data;
    });
  }

  select(item: IMeasurementType): void {
    this.selected = { ...item };
    this.Form.patchValue({
      name: item.name,
      isActive: item.isActive
    });
  }

  create(item: IMeasurementType): void {
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
