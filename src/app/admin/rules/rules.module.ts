import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesViewComponent } from './rules-view/rules-view.component';
import { RuleViewComponent } from './rule-view/rule-view.component';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableSortableDirective } from 'src/app/shared/directives/table-sortable.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateBookingPeriodRuleComponent } from './create-booking-period-rule/create-booking-period-rule.component';
import { CreateTemporaryPeriodRuleComponent } from './create-temporary-period-rule/create-temporary-period-rule.component';


@NgModule({
  declarations: [
    RulesViewComponent,
    RuleViewComponent,
    CreateBookingPeriodRuleComponent,
    CreateTemporaryPeriodRuleComponent
  ],
  imports: [
    CommonModule,
    DecimalPipe, 
    FormsModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    TableSortableDirective,
    SharedModule,
    RulesRoutingModule
  ]
})
export class RulesModule { }
