import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonInput, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class AuthPage implements OnInit {

  private readonly fb = inject(FormBuilder);


  authForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor() { }

  ngOnInit() {
  }


  async submit() {
    if(!this.authForm.valid) return this.authForm.markAllAsTouched();
  }

}
