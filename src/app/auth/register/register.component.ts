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
      lastName: [''],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
    this.clearMessagesAfterChange();
  }

  clearMessagesAfterChange():void{
    this.registerForm.get('dni')?.valueChanges.subscribe(() =>{
      this.errorMessage = '';
      this.successMessage = '';
    });
    this.registerForm.get('name')?.valueChanges.subscribe(() =>{
      this.errorMessage = '';
      this.successMessage = '';
    });
    this.registerForm.get('lastName')?.valueChanges.subscribe(() =>{
      this.errorMessage = '';
      this.successMessage = '';
    });
    this.registerForm.get('email')?.valueChanges.subscribe(() =>{
      this.errorMessage = '';
      this.successMessage = '';
    });
    this.registerForm.get('password')?.valueChanges.subscribe(() =>{
      this.errorMessage = '';
      this.successMessage = '';
    });
    this.registerForm.get('repeatPassword')?.valueChanges.subscribe(() =>{
      this.errorMessage = '';
      this.successMessage = '';
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
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.registerForm.patchValue({ password: '' ,repeatPassword:''});
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    this.registerForm.patchValue({ dni:'', email:'', name:'', lastName:'' ,password: '' ,repeatPassword:''});
    this.successMessage = 'Usuario registrado correctamente';
  }
}
