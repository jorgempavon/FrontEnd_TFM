import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { AuthService } from '../auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { RegisterDto } from 'src/app/shared/dtos/registerDto';
import { BodyErrorDto } from '../../shared/dtos/bodyErrorDto';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string;
  successMessage: string;

  constructor(private fb: FormBuilder,private spinnerService: SpinnerService,
    private authService: AuthService,private tokenService:TokenService,private router: Router) {
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      dni: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  register(): void {
    if (!this.registerForm.valid) {
      return;
    }

    this.spinnerService.show();
    const { dni,name,lastName, email, password,repeatPassword } = this.registerForm.value,
    registerDto: RegisterDto = {
      dni:dni,
      email: email,
      name: name,
      lastName: lastName,
      password: password,
      repeatPassword:repeatPassword
    };
    
    this.authService.register(registerDto).subscribe({
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
      this.proccessRegisterErrors(responseDto.body as BodyErrorDto);
      return;
    }
    this.successMessage = 'Usuario registrado correctamente';
    this.registerForm.patchValue({ dni:'', email:'', name:'', lastName:'' ,password: '' ,repeatPassword:''});
  }

  proccessRegisterErrors(bodyError:BodyErrorDto):void{
    if(bodyError.statusCode == 400){
      this.errorMessage = bodyError.message;
      this.registerForm.patchValue({ password: '' ,repeatPassword:''});
    }else if(bodyError.statusCode == 409){
      this.errorMessage = bodyError.message;
      this.registerForm.patchValue({ password: '' ,repeatPassword:''});
    }
  }
}
