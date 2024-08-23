import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { TaskService } from '../services';
import { IonicModule } from '@ionic/angular';
import { ToastService } from '../utils';
import { camera } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.page.html',
  styleUrls: ['./detail-task.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DetailTaskPage {

  private readonly taskService = inject(TaskService);
  private readonly toastService = inject(ToastService);
  private readonly storageService = inject(StorageService);

  @Input()
  set projectUid(value:string) {
    console.log('entra');
    this._projectUid = value;
  }

  @Input()
  set uid(value:string) {
    this._taskUid = value;
    this.task$ = from(this.taskService.getTask(value));
    this.images$ = this.storageService.getImages(value);
  }


  _projectUid!: string;
  _taskUid!: string;
  task$!: Observable<any>;
  images$!: Observable<any>;

  constructor() {
    addIcons({ camera });
  }



  async processTask() {
    const success = await this.taskService.updateStatus(this._taskUid, 'FINALIZADO');
    if(success) {
      this.task$ = from(this.taskService.getTask(this._taskUid));
      this.toastService.show('Tarea finalizada con exito');
    }
  }


  async addPhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    const response = await fetch(image.webPath!);
    const blob = await response.blob();
    const success = await this.storageService.create(blob, `${new Date().getTime()}`, this._taskUid);
    if(success) {
      this.toastService.show('Imagen subida con exito');
    }
  }

}
