import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { albumsOutline, albumsSharp, logOutOutline, logOutSharp } from 'ionicons/icons';
import { AuthService } from '../services';
import { from, Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule]
})
export class DashboardPage {

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  public appPages = [
    { title: 'Proyectos', url: '/dashboard/home', icon: 'albums' },
    { title: 'Proyectos finalizados', url: '/dashboard/finished', icon: 'albums' },
  ];

  user$: Observable<any> = from(this.auth.getUser());
  
  constructor() {
    addIcons({ logOutOutline, logOutSharp, albumsOutline, albumsSharp });
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/auth'], {replaceUrl: true});
  }

}
