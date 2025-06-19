import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookViewComponent } from '../client/books/book-view/book-view.component';
import { BooksViewComponent } from '../client/books/books-view/books-view.component';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { UsersviewComponent } from './users/usersview/usersview.component';

const routes: Routes = [
  {
    path: '',
    component:AdminComponent,
    children: [
      { path: 'book', component: BookViewComponent },
      { path: 'books', component: BooksViewComponent },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then(m => m.UsersModule)
      },
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
