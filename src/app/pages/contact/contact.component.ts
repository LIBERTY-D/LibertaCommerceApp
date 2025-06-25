import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CanComponentDeactivate } from '../../gaurds/contact/contact.gaurd';
import { Observable } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements CanComponentDeactivate {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private toastService: ToastService
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      this.contactService.contactUs(this.contactForm.value).subscribe({
        next: (res) => {
          this.toastService.showToast(res.message, 'success');
          this.contactForm.reset();
        },
        error: (err) => {
          if (err.error)
            this.toastService.showToast(err.error.message, 'error');
          else
            this.toastService.showToast(
              'failed to send message try again later!',
              'error'
            );
        },
      });
    } else {
      this.contactForm.markAllAsTouched();
      console.warn('Form is invalid');
    }
  }

  canDeactivate = (): boolean | Promise<boolean> | Observable<boolean> => {
    return (
      !this.contactForm.dirty ||
      confirm('You have unsaved changes. Leave anyway?')
    );
  };
}
