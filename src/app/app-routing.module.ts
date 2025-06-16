import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGuard } from './core/guards/client.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { RedirectComponent } from './core/components/redirect/redirect.component';

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
        canActivate: [ClientGuard],
        loadChildren: () =>
          import('./client/client.module').then(m => m.ClientModule)
        
      },
      {
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('./admin/admin.module').then(m => m.AdminModule)
        
      }
    ]
  },
  { path: '', component:RedirectComponent },
  { path: '**', component:RedirectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
