import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-details',
  standalone: true,
  styleUrl: './checkout-details.component.css',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-details.component.html',
})
export class CheckoutDetailsComponent implements OnInit {
  checkoutForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      contact: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
      }),
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{4,10}$/)],
        ],
      }),
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
  }

  get contact() {
    return this.checkoutForm.get('contact') as FormGroup;
  }

  get address() {
    return this.checkoutForm.get('address') as FormGroup;
  }
}
