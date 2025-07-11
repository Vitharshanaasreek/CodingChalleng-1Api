import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
   loginForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (res) => {
          this.successMessage = 'Login successful!';
          this.errorMessage = '';
          this.authService.storeToken(res.token);
          this.loginForm.reset();
          this.router.navigate(['/task']);  // Navigate to dashboard or tasks
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = 'Login failed. Check username or password.';
          this.successMessage = '';
        }
      });
    }
  }

}
