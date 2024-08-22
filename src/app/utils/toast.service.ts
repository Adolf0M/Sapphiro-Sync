import { inject, Injectable } from "@angular/core";
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private readonly toastController = inject(ToastController);

  async show(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}