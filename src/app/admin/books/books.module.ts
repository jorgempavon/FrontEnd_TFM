import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from './books-routing.module';
import { BooksViewComponent } from './books-view/books-view.component';
import { BookViewComponent } from './book-view/book-view.component';
import { FormsModule } from '@angular/forms';
import { CreateBookViewComponent } from './create-book-view/create-book-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateBookingLoanViewComponent } from '../bookingLoans/create-booking-loan-view/create-booking-loan-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    BooksViewComponent,
    CreateBookViewComponent,
    BookViewComponent,
    CreateBookingLoanViewComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class BooksModule { }
