import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BookviewComponent } from './books/bookview/bookview.component';
import { BooksviewComponent } from './books/booksview/booksview.component';
import { AdminComponent } from './admin.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    BookviewComponent,
    BooksviewComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    RouterModule,
    MatDialogModule
  ]
})
export class AdminModule {
 }
