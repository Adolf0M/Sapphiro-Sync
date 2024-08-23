import { Component, inject, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import { TaskService, UserService } from 'src/app/services';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ToastService } from 'src/app/utils';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class TaskModalComponent {

  @Input()
  projectUid!: string;

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly userService = inject(UserService);
  private readonly modalCtl = inject(ModalController);
  private readonly taskService = inject(TaskService);
  private readonly toastService = inject(ToastService);


  taskForm = this.fb.group({
    name: ['', Validators.required],
    priority: ['', Validators.required],
    description: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    users: [[], Validators.required]
  });

  users$: Observable<IUser[]> = this.userService.getAllUsers();


  async submit() {
    if(!this.taskForm.valid) return this.taskForm.markAllAsTouched();
    const success = await this.taskService.create(this.taskForm.getRawValue(), this.projectUid);
    if(success) {
      this.close();
      this.toastService.show('Tarea creada con exito');
    }
  }

  currentDate(control: string) {
    this.taskForm.get(control)?.patchValue(dayjs().format('YYYY-MM-DDTHH:mm:ss'));
  }

  close() {
    this.modalCtl.dismiss();
  }

}
