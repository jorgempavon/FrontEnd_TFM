import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { BookingLoanCreateDTO } from 'src/app/shared/dtos/bookingLoans/bookingLoanCreateDTO';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BookingLoanService } from 'src/app/shared/services/booking-loan.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { UserSharedService } from 'src/app/shared/services/user-shared.service';

@Component({
  selector: 'app-create-booking-loan-client-view',
  templateUrl: './create-booking-loan-client-view.component.html',
  styleUrls: ['./create-booking-loan-client-view.component.css']
})
export class CreateBookingLoanClientViewComponent {
  fields: DynamicFormField[] = [];
  form!: FormGroup;
  errorMessage:string = '';
  successMessage:string = '';
  bookId!: number;
  userId!:number;

  constructor(private spinnerService:SpinnerService,private userSharedService:UserSharedService,private bookingLoanService:BookingLoanService,
    private dialogRef: MatDialogRef<CreateBookingLoanClientViewComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit() {
    this.bookId = this.data.bookId;
    this.userId = this.data.userId;
    this.form = new FormGroup({
      beginDate: new FormControl(null, Validators.required),
    });

    this.form.get('beginDate')?.valueChanges.subscribe(value => {
      this.errorMessage = '';
      this.successMessage = '';
    });
  }

  onSubmit(): void {
    const formValues = this.form.value;
    this.createBookingLoan(formValues.beginDate)
  }

  createBookingLoan(beginDate: Date):void{
    const bookingLoanCreateDTO:BookingLoanCreateDTO = {
      userId: this.userId,
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
    this.form = new FormGroup({
      beginDate: new FormControl(null, Validators.required),
    });
  }

  
  onClose():void{
    this.dialogRef.close();
  }
}
