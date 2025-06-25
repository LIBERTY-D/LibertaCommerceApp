import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../validators/password.match.validator';
import { FormValidator } from '../../validators/form.validator';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../types/user.type';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpFormGroup: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: passwordMatchValidator }
  );

  signUpErrors: Record<string, string[]> = {
    firstName: [],
    lastName: [],
    email: [],
    password: [],
    confirmPassword: [],
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  goToSignInPage() {
    this.router.navigate(['', 'login']);
  }

  createUserAccount() {
    let user = { ...this.signUpFormGroup.value };
    delete user.confirmPassword;
    this.userService.createUserAccount(user).subscribe({
      next: (userRes: UserResponse) => {
        this.toastService.showToast(userRes.message);
      },
      error: (err) => {
        let error = err.error;
        if (error) {
          this.toastService.showToast(error.message, 'error');
        } else {
          this.toastService.showToast(error.message, 'error');
        }
      },
    });
  }

  invalidFirstName(field: string) {
    this.signUpErrors[field] = FormValidator.getFieldErrors(
      this.signUpFormGroup,
      field
    );
  }
  invalidLastName(field: string) {
    this.signUpErrors[field] = FormValidator.getFieldErrors(
      this.signUpFormGroup,
      field
    );
  }
  invalidConfirmPassword(field: string) {
    this.signUpErrors[field] = FormValidator.getFieldErrors(
      this.signUpFormGroup,
      field
    );
  }
  invalidEmail(field: string) {
    this.signUpErrors[field] = FormValidator.getFieldErrors(
      this.signUpFormGroup,
      field
    );
  }

  invalidPassword(field: string) {
    this.signUpErrors[field] = FormValidator.getFieldErrors(
      this.signUpFormGroup,
      field
    );
  }
}
