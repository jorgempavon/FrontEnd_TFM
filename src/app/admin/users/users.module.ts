import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { CreateUserViewComponent } from './create-user-view/create-user-view.component';
import { UsersviewComponent } from './usersview/usersview.component';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableSortableDirective } from 'src/app/shared/directives/table-sortable.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserViewComponent } from './user-view/user-view.component';


@NgModule({
  declarations: [
    CreateUserViewComponent,
    UsersviewComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule,
    DecimalPipe, 
    FormsModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    TableSortableDirective,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
