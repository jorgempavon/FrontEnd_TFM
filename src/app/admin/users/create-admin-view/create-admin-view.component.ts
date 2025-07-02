import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

import { UserCreateDTO } from 'src/app/shared/dtos/userCreateDto';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { AdminService } from '../admin.service';
import { SharedModule } from "../../../shared/shared.module";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-view',
  templateUrl: './create-admin-view.component.html',
  styleUrls: ['./create-admin-view.component.css']
})

export class CreateAdminViewComponent {
  fields: DynamicFormField[] = [
    { name: 'dni', label: 'DNI', type: 'text'},
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'lastName', label: 'Apellidos', type: 'text' }
  ];
  errorMessage: string;
  successMessage: string;
  form!:FormGroup;

  constructor(private fb: FormBuilder,private spinnerService: SpinnerService,
     private adminService:AdminService, private dialogRef: MatDialogRef<CreateAdminViewComponent>) {
    this.errorMessage = '';
    this.successMessage = '';
    this.form = this.fb.group({
      dni: ['',Validators.required],
      email: ['',Validators.required],
      name: ['',Validators.required],
      lastName: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.spinnerService.hide();
  }

  createUser(values: any): void {
    this.spinnerService.show();
    const userCreateDTO: UserCreateDTO = {
      dni: values.dni,
      email: values.email,
      name: values.name,
      lastName: values.lastName
    };

    this.adminService.create(userCreateDTO).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processCreateUserResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processCreateUserResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 201){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    this.form = this.fb.group({
      dni: [''],
      email: [''],
      name: [''],
      lastName: ['']
    });
    this.successMessage = 'Usuario creado correctamente';
  }

  deleteMessages():void{
    this.successMessage = '';
    this.errorMessage = '';
  }

  onClose():void{
    this.dialogRef.close();
  }
}
