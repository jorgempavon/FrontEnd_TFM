import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { CreateBookingLoanClientViewComponent } from './bookingLoans/create-booking-loan-client-view/create-booking-loan-client-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientComponent,
    CreateBookingLoanClientViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ClientRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule 
  ]
})
export class ClientModule { }
