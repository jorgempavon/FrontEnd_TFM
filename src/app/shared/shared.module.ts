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
import { PenaltiesViewComponent } from './components/penalties-view/penalties-view.component';
import { BookingPeriodPenaltyViewComponent } from './components/booking-period-penalty-view/booking-period-penalty-view.component';
import { TemporaryPeriodPenaltyViewComponent } from './components/temporary-period-penalty-view/temporary-period-penalty-view.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    ProfileComponent,
    DynamicFormComponent,
    DynamicModalComponent,
    BookingLoansViewComponent,
    PenaltiesViewComponent,
    BookingPeriodPenaltyViewComponent,
    TemporaryPeriodPenaltyViewComponent
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
