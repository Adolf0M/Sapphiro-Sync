import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp({
      "projectId":"sapphiro-sync-63024",
      "appId":"1:299448888737:web:b645414d627e0b9337efe0",
      "storageBucket":"sapphiro-sync-63024.appspot.com",
      "apiKey":"AIzaSyDmpc8CHNwiQ3gUyLLAb49g81MW_8Ua6pY",
      "authDomain":"sapphiro-sync-63024.firebaseapp.com",
      "messagingSenderId":"299448888737",
      "measurementId":"G-X742NVL80W"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
});
