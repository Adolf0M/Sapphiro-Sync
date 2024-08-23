import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController, IonicModule } from '@ionic/angular';
import { ProjectService, UserService } from '../../services';
import { IUser } from 'src/app/interfaces/user.interface';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/utils';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
  imports: [IonicModule, ReactiveFormsModule, FormsModule, CommonModule]
})
export class ProjectModalComponent {
  
  private readonly modalCtl = inject(ModalController);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly userService = inject(UserService);
  private readonly projectService = inject(ProjectService);
  private readonly toastService = inject(ToastService);
  
  public date: any;
  
  projectForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    users: [[], Validators.required],
  });

  users$: Observable<IUser[]> = this.userService.getUsers();
  
  async submit() {
    if(!this.projectForm.valid) return this.projectForm.markAllAsTouched();
    const success = await this.projectService.create(this.projectForm.getRawValue());
    if(success) {
      this.close();
      this.toastService.show('Proyecto creado con exito');
    }
  }


  currentDate(control: string) {
    this.projectForm.get(control)?.patchValue(dayjs().format('YYYY-MM-DDTHH:mm:ss'));
  }


  close() {
    this.modalCtl.dismiss();
  }

}
