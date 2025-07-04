import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookViewComponent } from 'src/app/shared/components/book-view/book-view.component';
import { BooksViewComponent } from 'src/app/shared/components/books-view/books-view.component';

const routes: Routes = [
  { path: '', component: BooksViewComponent },
  { path: 'bookview/:id', component: BookViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
