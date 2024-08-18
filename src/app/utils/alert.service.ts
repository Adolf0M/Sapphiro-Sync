import { inject, Injectable } from "@angular/core";
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  private readonly alertController = inject(AlertController);
  

  async show(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Cerrar'],
    });
    await alert.present();
  }
}