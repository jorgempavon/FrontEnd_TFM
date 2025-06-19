import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersviewComponent } from './usersview/usersview.component';
import { CreateUserViewComponent } from './create-user-view/create-user-view.component';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [
  { path: '', component: UsersviewComponent },
  { path: 'createUser', component: CreateUserViewComponent },
  { path: 'userView/:id', component: UserViewComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
