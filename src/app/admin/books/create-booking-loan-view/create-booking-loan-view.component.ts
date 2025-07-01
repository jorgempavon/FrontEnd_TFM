import { Component, Inject } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';
import { UserDTO } from 'src/app/shared/dtos/userDto';
import { UserService } from '../../users/user.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { BookingLoanService } from 'src/app/shared/services/booking-loan.service';
import { BookingLoanCreateDTO } from '../../../shared/dtos/bookingLoanCreateDTO';

@Component({
  selector: 'app-create-booking-loan-view',
  templateUrl: './create-booking-loan-view.component.html',
  styleUrls: ['./create-booking-loan-view.component.css']
})
export class CreateBookingLoanViewComponent {
  fields: DynamicFormField[] = [];
  form!: FormGroup;
  errorMessage:string = '';
  successMessage:string = '';
  bookId!: number;
  selectedUserId!:number;
  users!:UserDTO[];
  filteredUsers!: Observable<UserDTO[]>;

  constructor(private spinnerService:SpinnerService,private userService:UserService,private bookingLoanService:BookingLoanService,
    private dialogRef: MatDialogRef<CreateBookingLoanViewComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit() {
    this.bookId = this.data.bookId;
    this.form = new FormGroup({
      user: new FormControl(null, Validators.required),
      beginDate: new FormControl(null, Validators.required),
    });
    this.getUsersList();
    
    this.form.get('user')?.valueChanges.subscribe(value => {
      this.errorMessage = '';
      this.successMessage = '';
    });

    this.form.get('beginDate')?.valueChanges.subscribe(value => {
      this.errorMessage = '';
      this.successMessage = '';
    });
  }

  private filterUsers(name: string): UserDTO[] {
    const filterValue = name.toLowerCase();
    return this.users.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  displayUser(user: UserDTO): string {
    const lastName = user.lastName ? user.lastName : '';
    return user && user.name ? user.name+" "+ lastName: '';
  }

  getUsersList():void{
    this.spinnerService.show();
	  this.userService.findByNameAndDniAndEmail('','','').subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processGetUsersResponse(responseDto);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processGetUsersResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
     let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
     this.errorMessage = bodyErrorDto.message;
     return;
    }
    let bodyReponse: UserDTO[] = responseDto.body as UserDTO[];
    this.users = bodyReponse;
    this.filteredUsers = this.form.get('user')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterUsers(value || ''))
    );
  }

  onSubmit(): void {
    const formValues = this.form.value;
    let user:UserDTO = formValues.user;
    this.createBookingLoan(user.id,formValues.beginDate)
  }

  createBookingLoan(userId:number,beginDate: Date):void{
    const bookingLoanCreateDTO:BookingLoanCreateDTO = {
      userId: userId,
      beginDate:beginDate,
      bookId:this.bookId
    };
    this.spinnerService.show();
    this.bookingLoanService.create(bookingLoanCreateDTO).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processCreateBookingLoanResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processCreateBookingLoanResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 201){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    this.successMessage = 'Reserva creada correctamente';
  }

  
  onClose():void{
    this.dialogRef.close();
  }
}
