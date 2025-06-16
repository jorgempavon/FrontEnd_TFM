import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BookviewComponent } from './books/bookview/bookview.component';
import { BooksviewComponent } from './books/booksview/booksview.component';

@NgModule({
  declarations: [
    AdminComponent,
    BookviewComponent,
    BooksviewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class AdminModule { }
