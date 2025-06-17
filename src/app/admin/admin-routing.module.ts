import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookViewComponent } from '../client/books/book-view/book-view.component';
import { BooksViewComponent } from '../client/books/books-view/books-view.component';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component:AdminComponent,
    children: [
      { path: 'book', component: BookViewComponent },
      { path: 'books', component: BooksViewComponent },
      { path: 'profile', component: ProfileComponent },
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
