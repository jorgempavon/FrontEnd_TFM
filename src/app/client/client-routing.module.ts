import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { ClientComponent } from './client.component';
import { BookingLoansViewComponent } from '../shared/components/booking-loans-view/booking-loans-view.component';
import { PenaltiesViewComponent } from '../shared/components/penalties-view/penalties-view.component';
import { TemporaryPeriodPenaltyViewComponent } from '../shared/components/temporary-period-penalty-view/temporary-period-penalty-view.component';
import { BookingPeriodPenaltyViewComponent } from '../shared/components/booking-period-penalty-view/booking-period-penalty-view.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: 'profile', component: ProfileComponent},
      {
        path: 'bookingLoansView/:userid',component:BookingLoansViewComponent
      },
      {
        path: 'penaltiesView/:userid',component:PenaltiesViewComponent
      },
      {
        path: 'penalties/temporaryPenaltyView/:id',component:TemporaryPeriodPenaltyViewComponent
      },
      {
        path: 'penalties/bookingPenaltyView/:id',component:BookingPeriodPenaltyViewComponent
      },
      {
        path: 'books',
        loadChildren: () =>
          import('./books/books.module').then(m => m.BooksModule)
      },
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      { path: '**', redirectTo: 'books', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
