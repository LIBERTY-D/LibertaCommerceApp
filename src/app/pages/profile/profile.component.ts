import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { FormValidator } from '../../validators/form.validator';
import { passwordMatchValidator } from '../../validators/password.match.validator';
import { ModalComponent } from '../../components/modal/modal.component';

import { AuthService } from '../../services/auth-service.service';
import { User } from '../../types/user.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  @ViewChild('modalHolder', { read: ViewContainerRef })
  container!: ViewContainerRef;
  modalRef?: ComponentRef<ModalComponent>;

  userId?: number;
  loggedInUser: User | null = null;

  addressForm!: FormGroup;
  accountForm!: FormGroup;
  passwordForm!: FormGroup;

  addressSection: Record<string, string[]> = {
    street: [],
    city: [],
    state: [],
    postalCode: [],
    country: [],
  };

  accountSection: Record<string, string[]> = {
    firstName: [],
    lastName: [],
    email: [],
  };

  passwordSection: Record<string, string[]> = {
    password: [],
    confirmPassword: [],
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchLoggenInUser();
    this.addressForm = this.fb.group({
      street: [this.loggedInUser?.address?.street || '', Validators.required],
      city: [this.loggedInUser?.address?.city || '', Validators.required],
      state: [this.loggedInUser?.address?.state || '', Validators.required],
      postalCode: [
        this.loggedInUser?.address?.postalCode || '',
        Validators.required,
      ],
      country: [this.loggedInUser?.address?.country || '', Validators.required],
    });

    this.accountForm = this.fb.group({
      firstName: [this.loggedInUser?.firstName, Validators.required],
      lastName: [this.loggedInUser?.lastName, Validators.required],
      email: [
        this.loggedInUser?.email,
        [Validators.required, Validators.email],
      ],
    });

    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  createAddress(): void {
    if (this.userId) {
      this.userService
        .createAddress(this.addressForm.value, this.userId)
        .subscribe({
          next: (res) => {
            this.toastService.showToast(res.message, 'success');
            if (this.loggedInUser)
              this.authService.updateUser({
                ...this.loggedInUser,
                address: res.data,
              });
          },
          error: (err) => {
            this.toastService.showToast(
              err.error?.message || err.message,
              'error'
            );
          },
        });
    }
  }

  fetchLoggenInUser() {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.userId = user?.id;
        this.loggedInUser = user;
      },
      error: (err) => {
        if (err.error) this.toastService.showToast(err.error.message, 'error');
        else this.toastService.showToast(err.message, 'error');
      },
    });
  }
  updateAccount(): void {
    if (this.userId) {
      this.userService
        .updateAccount(this.accountForm.value, this.userId)
        .subscribe({
          next: (res) => {
            this.toastService.showToast(res.message, 'success');

            if (this.loggedInUser)
              this.authService.updateUser({
                ...this.loggedInUser,
                ...res.data,
              });
          },
          error: (err) => {
            this.toastService.showToast(
              err.error?.message || err.message,
              'error'
            );
          },
        });
    }
  }

  updatePassword(): void {
    if (this.userId) {
      this.userService
        .updatePassword(
          { password: this.passwordForm.get('password')?.value },
          this.userId
        )
        .subscribe({
          next: (res) => {
            this.toastService.showToast(res.message, 'success');
            this.passwordForm.reset();
          },
          error: (err) => {
            this.toastService.showToast(
              err.error?.message || err.message,
              'error'
            );
          },
        });
    }
  }

  confirmDeleteAccount(): void {
    this.container.clear();
    this.modalRef = this.container.createComponent(ModalComponent);
    this.modalRef.instance.message =
      'Are you sure you want to delete the account?';

    this.modalRef.instance.onConfirmCallback = () => {
      this.deleteAccountLogic();
      this.closeModal();
    };

    this.modalRef.instance.onCancelCallback = () => this.closeModal();
  }

  private deleteAccountLogic(): void {
    if (this.userId) {
      this.userService.deleteAccount(this.userId).subscribe({
        next: (res) => {
          this.toastService.showToast(res.message, 'success');
          this.authService.logout();
        },
        error: (err) =>
          this.toastService.showToast(
            err.error?.message || err.message,
            'error'
          ),
      });
    }
  }

  closeModal(): void {
    this.modalRef?.destroy();
  }

  invalidStreet(field: string) {
    this.addressSection[field] = FormValidator.getFieldErrors(
      this.getFormGroupAddress(),
      field
    );
  }
  invalidCity(field: string) {
    this.addressSection[field] = FormValidator.getFieldErrors(
      this.getFormGroupAddress(),
      field
    );
  }
  invalidState(field: string) {
    this.addressSection[field] = FormValidator.getFieldErrors(
      this.getFormGroupAddress(),
      field
    );
  }
  invalidPostalCode(field: string) {
    this.addressSection[field] = FormValidator.getFieldErrors(
      this.getFormGroupAddress(),
      field
    );
  }

  invalidCountry(field: string) {
    this.addressSection[field] = FormValidator.getFieldErrors(
      this.getFormGroupAddress(),
      field
    );
  }

  invalidFirstName(field: string) {
    this.accountSection[field] = FormValidator.getFieldErrors(
      this.getFormProfileGroup(),
      field
    );
  }
  invalidLastName(field: string) {
    this.accountSection[field] = FormValidator.getFieldErrors(
      this.getFormProfileGroup(),
      field
    );
  }

  invalidEmail(field: string) {
    this.accountSection[field] = FormValidator.getFieldErrors(
      this.getFormProfileGroup(),
      field
    );
  }

  invalidPassword(field: string) {
    this.passwordSection[field] = FormValidator.getFieldErrors(
      this.getFormPasswordGroup(),
      field
    );
  }

  invalidConfirmPassword(field: string) {
    this.passwordSection[field] = FormValidator.getFieldErrors(
      this.getFormPasswordGroup(),
      field
    );
  }

  private getFormGroupAddress(): FormGroup {
    return this.addressForm;
  }
  private getFormProfileGroup(): FormGroup {
    return this.accountForm;
  }

  private getFormPasswordGroup(): FormGroup {
    return this.passwordForm;
  }
}
