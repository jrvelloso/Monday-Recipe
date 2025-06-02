import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      password: ['', Validators.required],
      privacyPolicy: [false, Validators.requiredTrue]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      return;
    }

    const user = {
      id: 0,
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      birthdate: this.registerForm.value.birthdate,
      password: this.registerForm.value.password,
      isActive: true,
      isRegisted: true,
      isAdmin: false,
      favourites: [],
      recipes: []
    };

    this.userService.create(user).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.registerForm.reset();
        this.submitted = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}
