import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bibliokie',
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'client',
        loadChildren: () =>
          import('./client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  { path: '', redirectTo: 'bibliokie/auth/login', pathMatch: 'full' },
  { path: 'admin/', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: 'bibliokie/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
