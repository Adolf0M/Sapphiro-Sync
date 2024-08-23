import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, DocumentData, Firestore, getDoc, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ITask } from '../interfaces/task.interface';
import { AlertService, SpinnerService } from '../utils';
import { forkJoin, from, map, mergeMap, Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly firestore = inject(Firestore);
  private readonly alertService = inject(AlertService);
  private readonly spinner = inject(SpinnerService);

  private readonly collection = collection(this.firestore, 'tasks');
  private readonly collectionUser = collection(this.firestore, 'users');

  getTasks(projectUid: string) {
    const qry = query(this.collection, where('projectUid', '==', projectUid));
    return collectionData(qry, { idField: 'uid' }).pipe(
      mergeMap(tasks => 
        forkJoin(
          tasks.map(task => 
            forkJoin(
              task['users'].map((uid: string) => 
                from(getDoc(doc(this.collectionUser, uid))).pipe(
                  map(doc => {
                    return doc.data() as IUser;
                  })
                )
              )
            ).pipe(
              map(users => {
                task['assignedUsers'] = users; // Assuming you want to attach the user data to the task
                return task;
              })
            )
          )
        )
      )
    ) as unknown as Observable<ITask[]>;
  }

  async getTask(uid: string) {
    return await getDoc(doc(this.collection, uid));
  }


  async create(data: Omit<ITask, 'uid'|'status'>, projectUid: string): Promise<boolean> {
    try {
      this.spinner.showLoading('Creando tarea...');
      await addDoc(this.collection, {
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        status: 'ACTIVO',
        priority: data.priority,
        users: data.users,
        projectUid
      });
      return true;
    } catch (error: any) {
      this.alertService.show('Error', 'No se pudo crear el proyecto');
      return false;
    } finally {
      this.spinner.hideLoading();
    }
  }

  async update(data: Omit<ITask, 'uid'|'status'>, uid: string): Promise<boolean> {
    try {
      this.spinner.showLoading('Actualizando tarea...');
      await updateDoc(doc(this.collection, uid), {
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        users: data.users,
      });
      return true;
    } catch (error: any) {
      this.alertService.show('Error', 'No se pudo actualizar la tarea');
      return false;
    } finally {
      this.spinner.hideLoading();
    }
  }

  async updateStatus(uid: string, status: string): Promise<boolean> {
    try {
      this.spinner.showLoading('Actualizando status de tarea...');
      await updateDoc(doc(this.collection, uid), {
        status
      });
      return true;
    } catch (error: any) {
      console.log(error);
      this.alertService.show('Error', 'No se pudo actualizar status de la tarea');
      return false;
    } finally {
      this.spinner.hideLoading();
    }
  }
}
