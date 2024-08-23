import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { AlertService } from '../utils';
import { ITaskImage } from '../interfaces/task.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly storage = inject(Storage);
  private readonly firestore = inject(Firestore);
  private readonly alertService = inject(AlertService);
  private readonly collection = collection(this.firestore, 'storage');


  getImages(uid: string) {
    const qry = query(this.collection, where('taskUid', '==', uid));
    return collectionData(qry, { idField: 'uid' }) as Observable<ITaskImage[]>
  }

  async create(file: any, filename: string, uid: string) {
    try {
      const storageRef = ref(this.storage, `tasks/${filename}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(this.collection, {
        url: downloadURL,
        taskUid: uid
      });

      return true;
    } catch (error) {
      console.log(error);
      this.alertService.show('Error', 'No se pudo subir imagen');
      return false;
    }
  }
}
