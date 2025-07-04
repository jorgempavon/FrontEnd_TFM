import { Component, ViewChild } from '@angular/core';
import { BookDTO } from 'src/app/shared/dtos/books/bookDTO';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { MatDialog } from '@angular/material/dialog';
import { CreateBookViewComponent } from '../../../admin/books/create-book-view/create-book-view.component';
import { DynamicModalComponent } from 'src/app/shared/components/dynamic-modal/dynamic-modal.component';
import { ModalButton } from 'src/app/shared/dtos/modalButtonDto';
import { TokenService } from '../../../core/services/token.service';
import { BooksSharedService } from '../../services/books-shared.service';

@Component({
  selector: 'app-booksview',
  templateUrl: './books-view.component.html',
  styleUrls: ['./books-view.component.css']
})
export class BooksViewComponent {
  books!: BookDTO[];
  filterTitle!: string;
  filterAuthor!: string;
  filterIsbn!: string;
  filterGenre!: string;
  isAdmin!:boolean;
  editBookUrl:string = '/bibliokie/client/books/bookview/';
  @ViewChild(DynamicModalComponent) deleteModal!:DynamicModalComponent;
  modalTitle:string = 'Eliminar libro';
  modalBody!:string;
  modalButtons!:ModalButton[];

  constructor(private spinnerService: SpinnerService,private booksSharedService:BooksSharedService,
    private dialog:MatDialog, private tokenService:TokenService
  ){
    this.filterTitle = '';
    this.filterAuthor = '';
    this.filterIsbn = '';
    this.filterGenre = '';
    this.isAdmin = this.tokenService.getIsAdmin();
    if(this.isAdmin){
      this.editBookUrl='/bibliokie/admin/books/bookview/';
    }
  }
  
  ngOnInit(): void{
    this.getBooksList();
  }

  getBooksList():void{
    this.spinnerService.show();
	  this.booksSharedService.findByTitleAndAuthorAndIsbnAndGenre(this.filterTitle,this.filterAuthor
      ,this.filterIsbn,this.filterGenre).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processGetBooksResponse(responseDto);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processGetBooksResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
     let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
     return;
    }
    let bodyReponse: BookDTO[] = responseDto.body as BookDTO[];
    this.books = bodyReponse;
  }

  openCreateBookModal() {
    this.dialog.open(CreateBookViewComponent, {
      width: '300px'
    });
  }

  deleteBook(id:number):void{
    this.spinnerService.show();
    this.booksSharedService.delete(id).subscribe({
      next: () => {
        this.spinnerService.hide();
        this.getBooksList();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  
  openDeleteModal(id: number, title:string, author:string | undefined):void {
    this.modalBody = '¿Estas seguro de eliminar el libro '+title+' escrito por '+ author+ ' de forma definitiva?';
    this.modalButtons = [
      {
        label: 'Eliminar',
        type: 'danger',
        action: () => this.deleteBook(id)
      },
      {
        label: 'Cancelar',
        type: 'secondary',
        action: () => {}
      }
    ];

    this.deleteModal.open();
  }
}
