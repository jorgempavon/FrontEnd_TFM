import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksViewComponent } from './books-view/books-view.component';
import { BookViewComponent } from './book-view/book-view.component';

const routes: Routes = [
  { path: '', component: BooksViewComponent },
  { path: 'bookview/:id', component: BookViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
