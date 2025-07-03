import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup }  from '@angular/forms';
import { DynamicFormField } from '../../dtos/dynamicFormField';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnChanges{
  @Input() isVisibleSubmitButton:boolean = true;
  @Input() fields: DynamicFormField[] = [];
  @Input() form!: FormGroup;
  @Input() submitFn!: (formValues: any) => void;
  @Input() submitButtonText: string = 'Confirmar';
  @Input() errorMessage:string = '';
  @Input() successMessage:string = '';
  @Output()  formTouched = new EventEmitter<void>();

  ngOnChanges(): void {
    if(!this.form){
      return;
    }
    for(let field of this.fields){
      this.form.get(field.name)?.valueChanges.subscribe(() =>{
        this.formTouched.emit();
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitFn(this.form.value);
    }
  }
}

