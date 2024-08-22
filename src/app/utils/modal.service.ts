import { inject, Injectable } from "@angular/core";
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: "root"
})
export class ModalService {

  private readonly modalCtrl = inject(ModalController);

  async open(component: any, data?: any) {
    const modal = await this.modalCtrl.create({
      component,
      componentProps: data
    });
    modal.present();
  }
}