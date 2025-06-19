import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

import { UserCreateDTO } from 'src/app/shared/dtos/userCreateDto';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { UserDTO } from 'src/app/shared/dtos/userDto';
import { UserServiceAdmin } from '../userAdmin.service';

@Component({
  selector: 'app-create-user-view',
  templateUrl: './create-user-view.component.html',
  styleUrls: ['./create-user-view.component.css']
})
export class CreateUserViewComponent {
  fields: DynamicFormField[] = [
    { name: 'dni', label: 'DNI', type: 'text'},
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'lastName', label: 'Apellidos', type: 'text' },
    { name: 'isAdmin', label: '¿Es Administrador?', type: 'checkbox' }
  ];
  errorMessage: string;
  successMessage: string;
  form!:FormGroup;

  constructor(private fb: FormBuilder,private spinnerService: SpinnerService,
    private router: Router, private userServiceAdmin:UserServiceAdmin) {
    this.errorMessage = '';
    this.successMessage = '';
    this.form = this.fb.group({
      dni: '',
      email: '',
      name: '',
      lastName: '',
      isAdmin: false
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
      lastName: values.lastName,
      isAdmin: values.isAdmin
    };

    this.userServiceAdmin.create(userCreateDTO).subscribe({
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
      lastName: [''],
      oldPassword: [''],
      password: [''],
      repeatPassword: ['']
    });
    this.successMessage = 'Usuario creado correctamente';
  }

  deleteMessages():void{
    this.successMessage = '';
    this.errorMessage = '';
  }
}
