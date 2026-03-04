import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  fb = inject(FormBuilder);
  hasError = signal<boolean>(false);
  isPosting = signal<boolean>(false);
  router = inject(Router);

  authService = inject(AuthService);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fullName: ['', [Validators.required, Validators.minLength(3)]]
  })

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);

      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);

      return;
    }

    const body = this.registerForm.value;

    this.authService.register(body).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/')
        return;
      }

      this.hasError.set(true);

      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    })
  }
}
