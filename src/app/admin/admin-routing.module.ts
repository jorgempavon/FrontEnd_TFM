import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { BookingLoansViewComponent } from '../shared/components/booking-loans-view/booking-loans-view.component';

const routes: Routes = [
  {
    path: '',
    component:AdminComponent,
    children: [
      {
        path: 'rules',
        loadChildren: () =>
          import('./rules/rules.module').then(m => m.RulesModule)
      },
      {
        path: 'books',
        loadChildren: () =>
          import('./books/books.module').then(m => m.BooksModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then(m => m.UsersModule)
      },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'bookingLoansView/:userid',component:BookingLoansViewComponent
      },
      { path: '**', redirectTo: 'books', pathMatch: 'full' },
      { path: '', redirectTo: 'books', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
