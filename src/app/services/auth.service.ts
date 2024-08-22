import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";
import { ILogin, IRegister } from "../interfaces/user.interface";
import { collection, doc, Firestore, setDoc,  } from "@angular/fire/firestore";
import { AlertService, firebaseAuthError, SpinnerService } from "../utils";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);
  private readonly spinner = inject(SpinnerService);
  private readonly alertService = inject(AlertService);

  private readonly collection = collection(this.firestore, 'users');

  async login(data: ILogin): Promise<boolean> {
    try {
      this.spinner.showLoading('Iniciando...');
      await signInWithEmailAndPassword(this.auth, data.email, data.password);
      return true;
    } catch (error: any) {
      this.alertService.show('Error', firebaseAuthError.get(error.code) as string);
      return false;
    } finally {
      this.spinner.hideLoading();
    }
  }


  async register(data: IRegister): Promise<boolean> {
    try {
      this.spinner.showLoading('Registrando...');
      const user  = await createUserWithEmailAndPassword(this.auth, data.email, data.password);
      await this.signOut();
      this.createUser(user.user.uid, data);
      return true;
    } catch (error: any) {
      this.alertService.show('Error', firebaseAuthError.get(error.code) as string);
      return false;
    } finally {
      this.spinner.hideLoading();
    }
  }

  async signOut() {
    try {
      await this.auth.signOut();
      return true;
    } catch (error: any) {
      this.alertService.show('Error', firebaseAuthError.get(error.code) as string);
      return false;
    }
  }
  
  private async createUser(uid: string, data: IRegister) {
    try {
      await setDoc(doc(this.collection, uid), {
        name: data.name,
        surname: data.surname,
        email: data.email
      })
    } catch (error) {
      this.alertService.show('Error', 'No se pudo crear el usuario');
    }
  }
}