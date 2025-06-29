import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersviewComponent } from './usersview/usersview.component';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableSortableDirective } from 'src/app/shared/directives/table-sortable.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserViewComponent } from './user-view/user-view.component';
import { CreateAdminViewComponent } from './create-admin-view/create-admin-view.component';
import { CreateClientViewComponent } from './create-client-view/create-client-view.component';


@NgModule({
  declarations: [
    UsersviewComponent,
    UserViewComponent,
    CreateClientViewComponent
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
