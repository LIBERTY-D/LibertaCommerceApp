import { AbstractControl, FormGroup } from '@angular/forms';

export class FormValidator {
  static getFieldErrors(form: FormGroup, fieldName: string): string[] {
    const field: AbstractControl = form.get(fieldName)!;
    if (!field || !field.touched) return [];

    const errors: string[] = [];

    if (field.errors?.['required']) {
      errors.push(`${fieldName} is required`);
    }

    if (field.errors?.['email']) {
      errors.push('Invalid email format');
    }

    if (field.errors?.['minlength']) {
      errors.push(
        `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`
      );
    }

    if (
      fieldName === 'confirmPassword' &&
      form.errors?.['passwordMismatch']
    ) {
      errors.push('Passwords do not match');
    }

    return errors;
  }

  static isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
