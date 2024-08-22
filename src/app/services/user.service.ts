import { inject, Injectable } from '@angular/core';
import { collection, collectionData, DocumentData, Firestore, query, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly firestore = inject(Firestore);
  private readonly auth = inject(AuthService);

  private readonly collection = collection(this.firestore, 'users');

  getAllUsers() {
    const qry = query(this.collection);
    return collectionData(qry, { idField: 'uid' }) as Observable<IUser[]>
  }
  getUsers() {
    const qry = query(this.collection);
    return collectionData(qry, { idField: 'uid' }).pipe(
      map((users: DocumentData[]) => users.filter(e => e['uid'] !== this.auth.currentUser?.uid))
    ) as Observable<IUser[]>;
  }

}
