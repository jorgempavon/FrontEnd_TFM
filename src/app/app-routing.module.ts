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
      }
    ]
  },
  { path: '', redirectTo: 'bibliokie/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'bibliokie/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
