import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BookViewComponent } from '../client/books/book-view/book-view.component';
import { BooksViewComponent } from '../client/books/books-view/books-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent, 
    children: [
      { path: 'book', component: BookViewComponent },
      { path: 'books', component: BooksViewComponent },
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      { path: '**', redirectTo: 'books', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
