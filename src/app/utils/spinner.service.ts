import { inject, Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class SpinnerService {

  private readonly loadingCtrl = inject(LoadingController);

  private loading: HTMLIonLoadingElement | undefined;

  async showLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
    });

    this.loading.present();
  }

  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}