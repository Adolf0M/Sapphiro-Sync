import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SpinnerService, ToastService, Validations } from '../utils';
import { AuthService } from '../services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule
  ]
})
export class RegisterPage{

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    surname: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {
    validators: Validations.confirmPassword()
  });

  
  async submit() {
    if(!this.registerForm.valid) return this.registerForm.markAllAsTouched();
    const success = await this.authService.register(this.registerForm.getRawValue());
    if(success) {
      this.router.navigate(['/auth'], {replaceUrl: true});
      this.toastService.show('Registrado con exito');
    }
  }

}
