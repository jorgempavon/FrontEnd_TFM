import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookViewComponent } from './books/book-view/book-view.component';
import { BooksViewComponent } from './books/books-view/books-view.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';


@NgModule({
  declarations: [
    BookViewComponent,
    BooksViewComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ClientRoutingModule
  ],
  exports: [
    BookViewComponent,
    BooksViewComponent
  ]
})
export class ClientModule { }
