import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { DynamicFormField } from 'src/app/shared/dtos/dynamicFormField';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { MatDialogRef } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { BookCreateDTO } from 'src/app/shared/dtos/bookCreateDTO';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-create-book-view',
  templateUrl: './create-book-view.component.html',
  styleUrls: ['./create-book-view.component.css']
})
export class CreateBookViewComponent {
  fields: DynamicFormField[] = [
    { name: 'isbn', label: 'ISBN', type: 'text'},
    { name: 'title', label: 'Titulo', type: 'text' },
    { name: 'stock', label: 'Stock', type: 'number' },
    { name: 'genre', label: 'Género', type: 'text' },
    { name: 'author', label: 'Autor', type: 'text' },
    { name: 'releaseDate', label: 'Fecha de lanzamiento', type: 'date' },
  ];
  errorMessage: string;
  successMessage: string;
  form!:FormGroup;

  constructor(private fb: FormBuilder,private spinnerService: SpinnerService,
     private booksService:BooksService, private dialogRef: MatDialogRef<CreateBookViewComponent>) {
    this.errorMessage = '';
    this.successMessage = '';
    this.form = this.fb.group({
      isbn: '',
      title: '',
      stock: 1,
      author: '',
      genre: '',
      releaseDate: undefined
    });
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.spinnerService.hide();
  }

  createBook(values: any): void {
    this.spinnerService.show();
    const bookCreateDTO: BookCreateDTO = {
      isbn: values.isbn,
      title: values.title,
      stock: values.stock,
      releaseDate: undefined,
      genre: values.genre,
      author: values.author
    };
    
    this.booksService.create(bookCreateDTO).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processCreateBookResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processCreateBookResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 201){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    this.form = this.fb.group({
      isbn: [''],
      title: [''],
      stock: [0],
      releaseDate: [undefined],
      genre: [''],
      author: [''],
    });
    this.successMessage = 'Libro creado correctamente';
  }

  deleteMessages():void{
    this.successMessage = '';
    this.errorMessage = '';
  }

  onClose():void{
    this.dialogRef.close();
  }
}
