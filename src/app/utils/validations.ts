import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class Validations {

  static confirmPassword() {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      if (password !== confirmPassword) {
        control.get('confirmPassword')?.setErrors({ notSame: true });
        return { notSame: true };
      }
      return null;
    }
  }
}