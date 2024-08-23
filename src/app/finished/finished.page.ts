import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProjectService } from '../services';
import { ModalService } from '../utils';
import { IProject } from '../interfaces/project.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.page.html',
  styleUrls: ['./finished.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FinishedPage {

  private readonly projectService = inject(ProjectService);

  projects$: Observable<IProject[]> = this.projectService.getProjects('FINALIZADO');

}
