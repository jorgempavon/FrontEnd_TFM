import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { BookDTO } from 'src/app/shared/dtos/books/bookDTO';
import { BookUpdateDTO } from 'src/app/shared/dtos/books/bookUpdateDTO';
import { MatDialog } from '@angular/material/dialog';
import { CreateBookingLoanAdminViewComponent } from '../../../admin/bookingLoans/create-booking-loan-admin-view/create-booking-loan-admin-view.component';
import { CreateBookingLoanClientViewComponent } from '../../../client/bookingLoans/create-booking-loan-client-view/create-booking-loan-client-view.component';
import { BooksSharedService } from '../../services/books-shared.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent {
  fields: DynamicFormField[] = [
    { name: 'isbn', label: 'ISBN', type: 'text'},
    { name: 'title', label: 'Titulo', type: 'text' },
    { name: 'stock', label: 'Stock', type: 'number' },
    { name: 'genre', label: 'Género', type: 'text' },
    { name: 'author', label: 'Autor', type: 'text' },
    { name: 'releaseDate', label: 'Fecha de lanzamiento', type: 'date' },
  ];
  errorMessage!: string;
  successMessage!: string;
  form!:FormGroup;
  id!:number;
  isbnImage!:string;
  isAdmin!:boolean;

  constructor(private fb: FormBuilder,private router:Router,private route: ActivatedRoute, 
  private booksSharedService:BooksSharedService, private spinnerService:SpinnerService,
  private dialog: MatDialog, private tokenService:TokenService) {
    this.isAdmin = this.tokenService.getIsAdmin();

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id == null){
      this.router.navigate(['']);
      return;
    }
    
    this.id = Number(id);
    this.getBook();
  }

  getBook():void{
    this.spinnerService.show();
    this.booksSharedService.findById(this.id).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processGetBookResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  
  updateBook(values:any):void{
    let bookUpdateDTO:BookUpdateDTO = {
      isbn: values.isbn,
      title: values.title,
      stock: values.stock,
      genre: values.genre,
      author: values.author,
      releaseDate: values.releaseDate
    };
    this.spinnerService.show();
    this.booksSharedService.update(this.id,bookUpdateDTO).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processUpdateBookResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processGetBookResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    let bodyReponse: BookDTO = responseDto.body as BookDTO;
    this.isbnImage = bodyReponse.isbn;

    this.form = this.fb.group({
      isbn: [{ value:bodyReponse.isbn , disabled: !this.isAdmin }],
      title: [{ value:bodyReponse.title , disabled: !this.isAdmin }],
      stock: [{ value:bodyReponse.stock , disabled: !this.isAdmin }],
      genre: [{ value:bodyReponse.genre , disabled: !this.isAdmin }],
      author: [{ value:bodyReponse.author , disabled: !this.isAdmin }],
      releaseDate:[{ value:bodyReponse.releaseDate.toString().substring(0, 10) , disabled: !this.isAdmin }]
    });
  }

  processUpdateBookResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    this.successMessage = 'Libro modificado correctamente';
  }

  deleteMessages():void{
    this.successMessage = '';
    this.errorMessage = '';
  }


  openCreateBookingLoanAdminModal() {
    this.dialog.open(CreateBookingLoanAdminViewComponent, {
      width: '300px',
      data: {
        bookId: this.id
      }
    });
  }

  openCreateBookingLoanClientModal() {
    this.dialog.open(CreateBookingLoanClientViewComponent, {
      width: '300px',
      data: {
        bookId: this.id,
        userId: this.tokenService.getId()
      }
    });
  }
}
