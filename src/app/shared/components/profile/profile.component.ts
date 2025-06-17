import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from '../../services/spinner.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { BodyErrorDto } from '../../dtos/bodyErrorDto';
import { ResponseDto } from '../../dtos/reponseDto';
import { UserSelfUpdateDTO } from '../../dtos/userSelfUpdateDto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    updateUserForm!: FormGroup;
    errorMessage: string;
    successMessage: string;
  
    constructor(private fb: FormBuilder,private spinnerService: SpinnerService,
      private router: Router) {
      this.errorMessage = '';
      this.successMessage = '';
    }
  
    ngOnInit(): void {
      this.updateUserForm = this.fb.group({
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
      this.updateUserForm.get('dni')?.valueChanges.subscribe(() =>{
        this.errorMessage = '';
        this.successMessage = '';
      });
      this.updateUserForm.get('name')?.valueChanges.subscribe(() =>{
        this.errorMessage = '';
        this.successMessage = '';
      });
      this.updateUserForm.get('lastName')?.valueChanges.subscribe(() =>{
        this.errorMessage = '';
        this.successMessage = '';
      });
      this.updateUserForm.get('email')?.valueChanges.subscribe(() =>{
        this.errorMessage = '';
        this.successMessage = '';
      });
      this.updateUserForm.get('password')?.valueChanges.subscribe(() =>{
        this.errorMessage = '';
        this.successMessage = '';
      });
      this.updateUserForm.get('repeatPassword')?.valueChanges.subscribe(() =>{
        this.errorMessage = '';
        this.successMessage = '';
      });
    }
  
    updateUser(): void {
      if (!this.updateUserForm.valid) {
        return;
      }
  
      this.spinnerService.show();
      const { dni,name,lastName, email, password,repeatPassword } = this.updateUserForm.value,
      registerDto: UserSelfUpdateDTO = {
        dni:dni,
        email: email,
        name: name,
        lastName: lastName,
        password: password,
        repeatPassword:repeatPassword
      };
    }
  
    processRegisterResponse(responseDto:ResponseDto):void{
      if(responseDto.status != 201){
        let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
        this.updateUserForm.patchValue({ password: '' ,repeatPassword:''});
        this.errorMessage = bodyErrorDto.message;
        return;
      }
      this.updateUserForm.patchValue({ dni:'', email:'', name:'', lastName:'' ,password: '' ,repeatPassword:''});
      this.successMessage = 'Usuario registrado correctamente';
    }
}
