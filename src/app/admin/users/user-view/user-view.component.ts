import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';
import { UserService } from '../user.service';
import { UserAdminUpdateDto } from '../../../shared/dtos/userAdminUpdateDto';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { UserDTO } from 'src/app/shared/dtos/userDto';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  fields: DynamicFormField[] = [
    { name: 'dni', label: 'DNI', type: 'text'},
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'lastName', label: 'Apellidos', type: 'text' },
    { name: 'resetPassword', label: 'Resetear Contraseña', type: 'checkbox' },
    { name: 'isAdmin', label: 'Es administrador', type: 'checkbox' }
  ];
  errorMessage:string = '';
  successMessage:string = '';
  form!:FormGroup;
  id!:number;

  constructor(private fb: FormBuilder,private router:Router,private route: ActivatedRoute, 
  private userService:UserService, private spinnerService:SpinnerService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id == null){
      this.router.navigate(['bibliokie/admin/users']);
      return;
    }
    
    this.id = Number(id);
    this.getUser();
  }

  getUser():void{
    this.spinnerService.show();
    this.userService.findById(this.id).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processGetUserResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  
  updateUser(values:any):void{
    let userAdminUpdateDto:UserAdminUpdateDto = {
      name: values.name,
      email: values.email,
      lastName: values.lastName,
      resetPassword: values.resetPassword,
      isAdmin: values.isAdmin
    }
    this.spinnerService.show();
    this.userService.update(this.id,userAdminUpdateDto).subscribe({
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
      resetPassword:false,
      isAdmin: [bodyReponse.rol == 'admin' ? true:false ]
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
