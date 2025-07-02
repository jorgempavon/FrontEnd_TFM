import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

import { LoginDto } from 'src/app/shared/dtos/loginDto';
import { TokenService } from '../../core/services/token.service';
import { Router } from '@angular/router';
import { ResponseDto } from '../../shared/dtos/reponseDto';
import { SessionDTO } from '../../shared/dtos/sessionDto';
import { UserSharedService } from 'src/app/shared/services/user-shared.service';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  fields: DynamicFormField[] = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },

  ];
  errorMessage:string = '';
  successMessage:string = '';
  form!:FormGroup;
  id!:number;

  constructor(private fb: FormBuilder,private spinnerService: SpinnerService,
    private userSharedService: UserSharedService,private tokenService:TokenService,private router: Router) {
      this.form = this.fb.group({
        email: ['',Validators.required],
        password:  ['',Validators.required]
      });
  }

  login(): void {
    this.spinnerService.show();
    const { email, password } = this.form.value,
    loginDto: LoginDto = {
      email: email,
      password: password
    };
    
    this.userSharedService.login(loginDto).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processLoginResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processLoginResponse(responseDto:ResponseDto):void{
    if(responseDto.status == 401){
      this.form.patchValue({ password: '' });
      this.errorMessage =  'El correo o contraseña proporcionados son incorrectos';
      return;
    }
    let sessionDto: SessionDTO  =  responseDto.body as SessionDTO;
    this.tokenService.setToken(sessionDto.jwt);
    this.tokenService.setRol(sessionDto.rol);
    this.tokenService.setId(sessionDto.id);
    this.tokenService.setEmail(sessionDto.email);
    console.log(sessionDto.rol);
    let role:string = 'client';
    if(sessionDto.rol == 'admin'){
      role = 'admin';
    }
    this.router.navigate(['bibliokie/'+role+'/books']);
  }

  
  deleteMessages():void{
    this.successMessage = '';
    this.errorMessage = '';
  }
}
