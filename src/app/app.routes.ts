import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectToLogin = () => redirectUnauthorizedTo(['auth']);

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.page').then((m) => m.AuthPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage),
    ...canActivate(redirectToLogin),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then( m => m.HomePage)
      },
      {
        path: 'finished',
        loadComponent: () => import('./finished/finished.page').then( m => m.FinishedPage)
      },
      {
        path: 'project/:uid',
        loadComponent: () => import('./detail-project/detail-project.page').then( m => m.DetailProjectPage)
      },
      {
        path: 'detail-task/:projectuid/:uid',
        loadComponent: () => import('./detail-task/detail-task.page').then( m => m.DetailTaskPage)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },


];
