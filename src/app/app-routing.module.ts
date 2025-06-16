import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bibliokie',
    children: [
      {
        path: '',
        redirectTo: 'customer',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: 'bibliokie',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'bibliokie'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
