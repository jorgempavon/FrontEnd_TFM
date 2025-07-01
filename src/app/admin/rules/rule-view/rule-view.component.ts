import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { RulesService } from '../rules.service';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { RuleDTO } from 'src/app/shared/dtos/ruleDto';
import { RuleUpdateDTO } from 'src/app/shared/dtos/ruleUpdateDto';

@Component({
  selector: 'app-rule-view',
  templateUrl: './rule-view.component.html',
  styleUrls: ['./rule-view.component.css']
})
export class RuleViewComponent {
  fields: DynamicFormField[] = [
    { name: 'name', label: 'Nombre', type: 'text'},
    { name: 'numPenalties', label: 'Número de penalizaciones', type: 'number' },
    { name: 'days', label: 'Días de intervalo', type: 'number' }
  ];
  errorMessage:string = '';
  successMessage:string = '';
  form!:FormGroup;
  id!:number;

  constructor(private fb: FormBuilder,private router:Router,private route: ActivatedRoute, 
  private ruleService:RulesService, private spinnerService:SpinnerService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id == null){
      this.router.navigate(['bibliokie/admin/rules']);
      return;
    }
    this.spinnerService.show();
    this.id = Number(id);
    this.getRule();
  }

  getRule():void{
    this.ruleService.findById(this.id).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processGetRuleResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  
  updateRule(values:any):void{
    let ruleUpdateDto:RuleUpdateDTO = {
      name: values.name,
      numPenalties: values.numPenalties,
      days: values.days
    }

    this.ruleService.update(this.id,ruleUpdateDto).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processUpdateRuleResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processGetRuleResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    let bodyReponse: RuleDTO = responseDto.body as RuleDTO;

    this.form = this.fb.group({
      name: [bodyReponse.name],
      numPenalties: [bodyReponse.numPenalties],
      days: [bodyReponse.days]
    });
  }

  processUpdateRuleResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    this.successMessage = 'Regla modificada correctamente';
  }

  deleteMessages():void{
    this.successMessage = '';
    this.errorMessage = '';
  }
}
