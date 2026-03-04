import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {
  fb = inject(FormBuilder);
  hasError = signal<boolean>(false);
  isPosting = signal<boolean>(false);

  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);

      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);

      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe((res) => {
      console.log(res);
    })
  }
}
