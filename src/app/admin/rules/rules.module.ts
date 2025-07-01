import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesViewComponent } from './rules-view/rules-view.component';
import { RuleViewComponent } from './rule-view/rule-view.component';
import { CreateRuleViewComponent } from './create-rule-view/create-rule-view.component';


@NgModule({
  declarations: [
    RulesViewComponent,
    RuleViewComponent,
    CreateRuleViewComponent
  ],
  imports: [
    CommonModule,
    RulesRoutingModule
  ]
})
export class RulesModule { }
