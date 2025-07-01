import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RulesViewComponent } from './rules-view/rules-view.component';
import { RuleViewComponent } from './rule-view/rule-view.component';

const routes: Routes = [
  { path: '', component: RulesViewComponent },
  { path: 'ruleView/:id', component: RuleViewComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesRoutingModule { }
