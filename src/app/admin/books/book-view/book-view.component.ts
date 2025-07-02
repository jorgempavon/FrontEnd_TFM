import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';
import { BooksService } from '../books.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { BookDTO } from 'src/app/shared/dtos/bookDTO';
import { BookUpdateDTO } from 'src/app/shared/dtos/bookUpdateDTO';
import { MatDialog } from '@angular/material/dialog';
import { CreateBookingLoanViewComponent } from '../../bookingLoans/create-booking-loan-view/create-booking-loan-view.component';

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

  constructor(private fb: FormBuilder,private router:Router,private route: ActivatedRoute, 
  private booksService:BooksService, private spinnerService:SpinnerService,
  private dialog: MatDialog) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id == null){
      this.router.navigate(['bibliokie/admin/books']);
      return;
    }
    
    this.id = Number(id);
    this.getBook();
  }

  getBook():void{
    this.spinnerService.show();
    this.booksService.findById(this.id).subscribe({
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
    this.booksService.update(this.id,bookUpdateDTO).subscribe({
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
      isbn: [bodyReponse.isbn],
      title: [bodyReponse.title],
      stock: [bodyReponse.stock],
      genre: [bodyReponse.genre],
      author: [bodyReponse.author],
      releaseDate: [bodyReponse.releaseDate]
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


  openCreateBookingLoanModal() {
    this.dialog.open(CreateBookingLoanViewComponent, {
      width: '300px',
      data: {
        bookId: this.id
      }
    });
  }
}
