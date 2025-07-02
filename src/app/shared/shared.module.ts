import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicModalComponent } from './components/dynamic-modal/dynamic-modal.component';
import { BookingLoansViewComponent } from './components/booking-loans-view/booking-loans-view.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableSortableDirective } from './directives/table-sortable.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    ProfileComponent,
    DynamicFormComponent,
    DynamicModalComponent,
    BookingLoansViewComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    DynamicModalComponent,
    DynamicFormComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    FormsModule,
    TableSortableDirective
  ]
})
export class SharedModule { }
