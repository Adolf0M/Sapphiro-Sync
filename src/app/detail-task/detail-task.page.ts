import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { TaskService } from '../services';
import { IonicModule } from '@ionic/angular';
import { ToastService } from '../utils';
import { camera } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.page.html',
  styleUrls: ['./detail-task.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DetailTaskPage {

  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  @Input()
  set projectUid(value:string) {
    console.log('entra');
    this._projectUid = value;
  }

  @Input()
  set uid(value:string) {
    this._taskUid = value;
    this.task$ = from(this.taskService.getTask(value));
  }


  _projectUid!: string;
  _taskUid!: string;
  task$!: Observable<any>;

  constructor() {
    addIcons({ camera });
  }



  async processTask() {
    const success = await this.taskService.updateStatus(this._taskUid, 'FINALIZADO');
    if(success) {
      this.toastService.show('Tarea finalizada con exito');
    }
  }


  addPhoto() {

  }

}
