import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewComponent } from './user-view/user-view.component';
import { UsersViewComponent } from './users-view/users-view.component';

const routes: Routes = [
  { path: '', component: UsersViewComponent },
  { path: 'userView/:id', component: UserViewComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
