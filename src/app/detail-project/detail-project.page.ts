import { CommonModule } from '@angular/common';
import { Component, inject, Input, input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonRouterLink } from '@ionic/angular/standalone';
import { from, Observable } from 'rxjs';
import { ProjectService, TaskService } from '../services';
import { ModalService } from '../utils';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { TaskModalComponent } from '../components/task-modal/task-modal.component';
import { ITask } from '../interfaces/task.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.page.html',
  styleUrls: ['./detail-project.page.scss'],
  standalone: true,
  imports: [IonicModule, IonRouterLink, CommonModule],
  providers: [
    ModalService
  ]
})
export class DetailProjectPage {

  private readonly projectService = inject(ProjectService);
  private readonly taskService = inject(TaskService);
  private readonly modalService = inject(ModalService);
  private readonly router = inject(Router);

  @Input()
  set uid(value: string) {
    this.projectUid = value;
    this.project$ = from(this.projectService.getProject(value));
    this.tasks$ = this.taskService.getTasks(value);
  }

  private projectUid!: string;
  project$!: Observable<any>;
  tasks$!: Observable<ITask[]>;

  constructor() {
    addIcons({ add });
  }

  addTask() {
    this.modalService.open(TaskModalComponent, {projectUid: this.projectUid});
  }

  detailTask(uid: string) {
    this.router.navigate([`/dashboard/detail-task/${this.projectUid}/${uid}`]);
  }

}
