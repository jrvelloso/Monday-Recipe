import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/interfaces/iuser';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  Form!: FormGroup;
  users!: IUser[];
  selected: IUser | null = null;

  constructor(private service: UserService, private fb: FormBuilder) {
    this.Form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.service.getAll().subscribe((data: IUser[]) => {
      this.users = data;
    });
  }

  select(item: IUser): void {
    this.selected = { ...item };
    this.Form.patchValue({
      name: item.name,
      email: item.email,
      password: item.password,
      isActive: item.isActive
    });
  }

  create(item: IUser): void {
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
        this.selected.email = this.Form.value.email;
        this.selected.password = this.Form.value.password;
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
