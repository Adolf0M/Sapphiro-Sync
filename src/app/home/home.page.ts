import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { ModalService } from '../utils';
import { ProjectModalComponent } from '../components/project-modal/project-modal.component';
import { ProjectService } from '../services';
import { IProject } from '../interfaces/project.interface';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule, RouterLink, FormsModule],
  providers: [
    ModalService
  ]
})
export class HomePage {

  private readonly modalService = inject(ModalService);
  private readonly projectService = inject(ProjectService);

  projects$: Observable<IProject[]> = this.projectService.getProjects('ACTIVO');

  constructor() {
    addIcons({ add });
  }

  add() {
    this.modalService.open(ProjectModalComponent);
  }

}
