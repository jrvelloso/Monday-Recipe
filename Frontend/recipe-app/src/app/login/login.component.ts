import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.userService.login(email, password).subscribe({
      next: (res: any) => {
        // Handle successful login, e.g., redirect or store token
        console.log('Login successful', res);
      },
      error: (err: any) => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
