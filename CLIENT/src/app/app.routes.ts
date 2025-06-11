import { Routes } from '@angular/router';
// import { UserComponent } from './user/user.component';
// import { AdminComponent } from './admin/admin.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./routes/user.route').then(m => m.USER_ROUTES)
  }
];
