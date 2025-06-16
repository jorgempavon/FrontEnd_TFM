import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

import { AuthService } from '../auth.service';
import { LoginDto } from 'src/app/shared/dtos/loginDto';
import { TokenService } from '../../core/services/token.service';
import { Router } from '@angular/router';
import { ResponseDto } from '../../shared/dtos/reponseDto';
import { SessionDTO } from '../../shared/dtos/sessionDto';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder,private spinnerService: SpinnerService,
    private authService: AuthService,private tokenService:TokenService,private router: Router) {
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.spinnerService.show();
    const { email, password } = this.loginForm.value,
    loginDto: LoginDto = {
      email: email,
      password: password
    };
    
    this.authService.login(loginDto).subscribe({
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
      this.errorMessage = "El email o contraseña proporcionados son incorrectos";
      this.loginForm.patchValue({ password: '' });
      return;
    }
    let sessionDto: SessionDTO  =  responseDto.body as SessionDTO 
    this.tokenService.setToken(sessionDto.jwt);
    this.tokenService.setRole(sessionDto.isAdmin);

    let role:string = 'client';
    if(sessionDto.isAdmin){
      role = 'admin';
    }
    this.router.navigate(['bibliokie/'+role+'/books']);
  }

}
