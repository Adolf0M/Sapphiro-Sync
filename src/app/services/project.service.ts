import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, DocumentData, Firestore, getDoc, query } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { IProject } from '../interfaces/project.interface';
import { AlertService, SpinnerService } from '../utils';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly firestore = inject(Firestore);
  private readonly auth = inject(AuthService);
  private readonly alertService = inject(AlertService);
  private readonly spinner = inject(SpinnerService);

  private readonly collection = collection(this.firestore, 'projects');


  getProjects() {
    const qry = query(this.collection);
    return collectionData(qry, {idField: 'uid'}).pipe(
      map((projects: DocumentData[]) => projects.map((project) => {
        const userAssigned = project['user']?.some((e: string) => e === this.auth.currentUser?.uid);
        if(userAssigned || project['userUid'] === this.auth.currentUser?.uid) {
          return project;
        }
        return null;
      }).filter(e => e !== null))
    ) as Observable<IProject[]>;
  }

  async getProject(uid: string|undefined) {
    return await getDoc(doc(this.collection, uid!)); 
  }


  async create(data: Omit<IProject,'uid'|'status'>): Promise<boolean> {
    try {
      this.spinner.showLoading('Creando proyecto...');
      await addDoc(this.collection,{
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        status: 'ACTIVO',
        users: data.users,
        userUid: this.auth.currentUser?.uid
      })
      return true;
    } catch (error: any) {
      console.log(error);
      this.alertService.show('Error', 'No se pudo crear el proyecto');
      return false;
    } finally {
      this.spinner.hideLoading();
    }
  }
}
