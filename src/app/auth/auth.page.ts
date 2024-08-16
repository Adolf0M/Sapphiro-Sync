import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonInput,
    CommonModule,
    IonButton,
    RouterModule
  ]
})
export class AuthPage {

  private readonly fb = inject(FormBuilder);


  authForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  async submit() {
    if(!this.authForm.valid) return this.authForm.markAllAsTouched();
  }

}
