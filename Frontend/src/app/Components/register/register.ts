import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Auth } from '../../Service/authservice';
import { AuthService } from '../../Service/auth-service';
import { Auth } from '../../Class/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
 registerForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const data: Auth = this.registerForm.value;
      this.authService.register(data).subscribe({
        next: () => {
          this.successMessage = 'Registration successful!';
          this.errorMessage = '';
          this.registerForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Registration failed. Try another username.';
          this.successMessage = '';
        }
      });
    }
  }
  }


