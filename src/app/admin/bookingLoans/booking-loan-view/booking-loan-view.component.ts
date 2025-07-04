import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { BookingLoanDTO } from 'src/app/shared/dtos/bookingLoans/bookingLoanDTO';
import { BookingLoanUpdateDTO } from 'src/app/shared/dtos/bookingLoans/bookingLoanUpdateDTO';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BookingLoanService } from 'src/app/shared/services/booking-loan.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-booking-loan-view',
  templateUrl: './booking-loan-view.component.html',
  styleUrls: ['./booking-loan-view.component.css']
})
export class BookingLoanViewComponent {
  fields: DynamicFormField[] = [
    { name: 'beginDate', label: 'Fecha inicio', type: 'date'},
    { name: 'endDate', label: 'Fecha fin', type: 'date'},
    { name: 'collected', label: '¿Libro recogido?', type: 'checkbox' },
    { name: 'returned', label: '¿Libro devuelto?', type: 'checkbox' },
    { name: 'bookTitle', label: 'Libro', type: 'text' },
    { name: 'clientName', label: 'Cliente', type: 'text'},
  ];
  errorMessage:string = '';
  successMessage:string = '';
  form!:FormGroup;
  id!:number;

  constructor(private fb: FormBuilder,private router:Router,private route: ActivatedRoute, 
  private bookingLoanService:BookingLoanService, private spinnerService:SpinnerService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id == null){
      this.router.navigate(['bibliokie/admin/books']);
      return;
    }
    
    this.id = Number(id);
    this.getBookingLoan();
  }

  getBookingLoan():void{
    this.spinnerService.show();
    this.bookingLoanService.findById(this.id).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processGetBookingLoanResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  
  updateBookingLoan(values:any):void{
    let bookingLoanUpdateDto:BookingLoanUpdateDTO = {
      beginDate: values.beginDate,
      endDate: values.endDate,
      returned: values.returned,
      collected: values.collected
    }
    this.spinnerService.show();
    this.bookingLoanService.update(this.id,bookingLoanUpdateDto).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processUpdateBookingLoanResponse(responseDto);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processGetBookingLoanResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    let bodyReponse: BookingLoanDTO = responseDto.body as BookingLoanDTO;

    this.form = this.fb.group({
      beginDate: [bodyReponse.beginDate.toString().substring(0, 10)],
      endDate: [bodyReponse.endDate.toString().substring(0, 10)],
      returned: [bodyReponse.returned],
      collected: [bodyReponse.collected],
      clientName: [{ value: bodyReponse.clientName, disabled: true }],
      bookTitle: [{ value: bodyReponse.bookTitle, disabled: true }]
    });
  }

  processUpdateBookingLoanResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    this.successMessage = 'Reserva modificada correctamente';
  }

  deleteMessages():void{
    this.successMessage = '';
    this.errorMessage = '';
  }
}
