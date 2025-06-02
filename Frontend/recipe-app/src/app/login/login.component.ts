import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFormReceita!: FormGroup ;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginFormReceita = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginFormReceita.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginFormReceita.invalid) {
      return;
    }

    const { email, password } = this.loginFormReceita.value;
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
