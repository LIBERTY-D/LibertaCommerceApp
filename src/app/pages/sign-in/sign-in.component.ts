import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { FormValidator } from '../../validators/form.validator';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { LoginResponse } from '../../types/user.type';
import { ToastService } from '../../services/toast.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  loginErrors: Record<string, string[]> = {
    email: [],
    password: [],
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit(): void {}

  goToSignUpPage() {
    this.router.navigate(['', 'signup']);
  }

  loginInToAppliction(_: Event) {
    let email = this.loginFormGroup.get('email')?.value;
    let password = this.loginFormGroup.get('password')?.value;
    this.userService.loginUser({ email, password }).subscribe({
      next: (data: LoginResponse) => {
        this.toastService.showToast(data.message, 'success');
        this.localStorageService.setAuth(environment.LIBERTA_AUTH_KEY, data);
        this.router.navigate(['/']);
      },
      error: (err) => {
        let error = err.error;
        if (error) {
          this.toastService.showToast(error.message, 'error');
        } else {
          this.toastService.showToast(err.message, 'error');
        }
      },
    });
  }

  invalidEmail(field: string) {
    this.loginErrors[field] = FormValidator.getFieldErrors(
      this.loginFormGroup,
      field
    );
  }

  invalidPassword(field: string) {
    this.loginErrors[field] = FormValidator.getFieldErrors(
      this.loginFormGroup,
      field
    );
  }
}
