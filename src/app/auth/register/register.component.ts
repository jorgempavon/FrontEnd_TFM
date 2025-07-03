import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { RegisterDto } from 'src/app/shared/dtos/users/registerDto';
import { BodyErrorDto } from '../../shared/dtos/bodyErrorDto';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';
import { ClientSharedService } from 'src/app/shared/services/client-shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fields: DynamicFormField[] = [
    { name: 'dni', label: 'DNI', type: 'text'},
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'lastName', label: 'Apellidos', type: 'text' },
    { name: 'password', label: 'Contraseña', type: 'password' },
    { name: 'repeatPassword', label: 'Repite la contraseña', type: 'password' }
  ];
  errorMessage:string = '';
  successMessage:string = '';
  form!:FormGroup;

  constructor(private fb: FormBuilder,private spinnerService: SpinnerService,
    private clientSharedService: ClientSharedService,private tokenService:TokenService,private router: Router) {
      this.form = this.fb.group({
      dni: ['',Validators.required],
      email: ['',Validators.required],
      name: ['',Validators.required],
      lastName: ['',Validators.required],
      password: ['',Validators.required],
      repeatPassword: ['',Validators.required]
    });
  }


  register(): void {
    this.spinnerService.show();
    const { dni,name,lastName, email, password,repeatPassword } = this.form.value,
    registerDto: RegisterDto = {
      dni:dni,
      email: email,
      name: name,
      lastName: lastName,
      password: password,
      repeatPassword:repeatPassword
    };
    
    this.clientSharedService.register(registerDto).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processRegisterResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processRegisterResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 201){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.form.patchValue({ password: '' ,repeatPassword:''});
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    this.form.patchValue({ dni:'', email:'', name:'', lastName:'' ,password: '' ,repeatPassword:''});
    this.successMessage = 'Usuario registrado correctamente';
  }

  deleteMessages():void{
    this.successMessage = '';
    this.errorMessage = '';
  }
}
