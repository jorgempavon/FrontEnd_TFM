import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { TemporaryPeriodRuleService } from '../temporary-period-rule.service';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { RuleCreateDTO } from 'src/app/shared/dtos/ruleCreateDto';

@Component({
  selector: 'app-create-temporary-period-rule',
  templateUrl: './create-temporary-period-rule.component.html',
  styleUrls: ['./create-temporary-period-rule.component.css']
})
export class CreateTemporaryPeriodRuleComponent {
  fields: DynamicFormField[] = [
    { name: 'name', label: 'Nombre', type: 'text'},
    { name: 'numPenalties', label: 'Número de penalizaciones', type: 'number' },
    { name: 'days', label: 'Días hasta la proxima reserva', type: 'number' }
  ];
  errorMessage: string;
  successMessage: string;
  form!:FormGroup;

  constructor(private fb: FormBuilder,private spinnerService: SpinnerService,
     private temporaryPeriodRuleService:TemporaryPeriodRuleService, private dialogRef: MatDialogRef<CreateTemporaryPeriodRuleComponent>) {
    this.errorMessage = '';
    this.successMessage = '';
    this.form = this.fb.group({
      name: ['',Validators.required],
      numPenalties: [0,Validators.required],
      days: [0,Validators.required]
    });
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.spinnerService.hide();
  }

  createRule(values: any): void {
    this.spinnerService.show();
    const userCreateDTO: RuleCreateDTO = {
      name: values.name,
      numPenalties: values.numPenalties,
      days: values.days
    };

    this.temporaryPeriodRuleService.create(userCreateDTO).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processCreateRuleResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processCreateRuleResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 201){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    this.form = this.fb.group({
      name: ['',Validators.required],
      numPenalties: [0,Validators.required],
      days: [0,Validators.required]
    });
    this.successMessage = 'Regla creada correctamente';
  }

  deleteMessages():void{
    this.successMessage = '';
    this.errorMessage = '';
  }

  onClose():void{
    this.dialogRef.close();
  }
}
