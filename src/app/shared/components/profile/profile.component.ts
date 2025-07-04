import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from '../../services/spinner.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { BodyErrorDto } from '../../dtos/bodyErrorDto';
import { ResponseDto } from '../../dtos/reponseDto';
import { UserSelfUpdateDTO } from '../../dtos/users/userSelfUpdateDto';
import { DynamicFormField } from '../../dtos/dynamicFormField';
import { UserSharedService } from '../../services/user-shared.service';
import { UserDTO } from '../../dtos/users/userDto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  fields: DynamicFormField[] = [
    { name: 'dni', label: 'DNI', type: 'text'},
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'lastName', label: 'Apellidos', type: 'text' },
    { name: 'oldPassword', label: 'Contraseña actual', type: 'password' },
    { name: 'password', label: 'Contraseña', type: 'password' },
    { name: 'repeatPassword', label: 'Confirmar Contraseña', type: 'password' }

  ];
  errorMessage: string;
  successMessage: string;
  form!:FormGroup;
  id:number;

  constructor(private fb: FormBuilder,private spinnerService: SpinnerService,
    private router: Router, private userSharedService:UserSharedService, private tokenService:TokenService) {
    this.errorMessage = '';
    this.successMessage = '';
    this.id = this.tokenService.getId(); 
    
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.userSharedService.findById(this.id).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processGetUserResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateUser(values: any): void {
    this.spinnerService.show();
    const userSelfUpdateDTO: UserSelfUpdateDTO = {
      dni: values.dni,
      email: values.email,
      name: values.name,
      lastName: values.lastName,
      password: values.password,
      repeatPassword: values.repeatPassword,
      oldPassword: values.oldPassword
    };

    this.userSharedService.updateSelf(userSelfUpdateDTO).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processUpdateUserResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processGetUserResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    let bodyReponse: UserDTO = responseDto.body as UserDTO;

    this.form = this.fb.group({
      dni: [bodyReponse.dni],
      email: [bodyReponse.email],
      name: [bodyReponse.name],
      lastName: [bodyReponse.lastName],
      oldPassword: [''],
      password: [''],
      repeatPassword: ['']
    });
  }

  processUpdateUserResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    this.successMessage = 'Usuario modificado correctamente';
  }

  deleteMessages():void{
    this.successMessage = '';
    this.errorMessage = '';
  }
}
