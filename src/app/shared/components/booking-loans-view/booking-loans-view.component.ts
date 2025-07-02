import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';
import { BookingLoanService } from '../../services/booking-loan.service';
import { UserSharedService } from '../../services/user-shared.service';
import { ResponseDto } from '../../dtos/reponseDto';
import { BodyErrorDto } from '../../dtos/bodyErrorDto';
import { UserDTO } from '../../dtos/userDto';
import { BookingLoanDTO } from '../../dtos/bookingLoanDTO';
import { DynamicModalComponent } from '../dynamic-modal/dynamic-modal.component';
import { ModalButton } from '../../dtos/modalButtonDto';
import { SortEvent } from '../../dtos/shortDto';
import { TableSortableDirective } from '../../directives/table-sortable.directive';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-booking-loans-view',
  templateUrl: './booking-loans-view.component.html',
  styleUrls: ['./booking-loans-view.component.css']
})
export class BookingLoansViewComponent {
  userName!:string;
  userId!:number;
  errorMessage:string = '';
  successMessage:string = '';
  page = 1;
  pageSize = 4;
  collectionSize!:number;
  listBookingLoans!: BookingLoanDTO[];
  pagedListBookingLoans!: BookingLoanDTO[];
  @ViewChildren(TableSortableDirective) headers!: QueryList<TableSortableDirective>;
  @ViewChild(DynamicModalComponent) deleteModal!:DynamicModalComponent;
  modalTitle:string = 'Eliminar reserva';
  modalBody!:string;
  modalButtons!:ModalButton[];
  editBookingLoanUrl: string = '/bibliokie/bookingloanView/';
  isAdmin!:boolean;
  
  constructor(private fb: FormBuilder,private router:Router,private route: ActivatedRoute, 
  private bookingLoanService:BookingLoanService, private spinnerService:SpinnerService,
  private userSharedService:UserSharedService, private tokenService:TokenService) {
    this.isAdmin = this.tokenService.getIsAdmin();
  }
  
  ngOnInit() {
    const userid = this.route.snapshot.paramMap.get('userid');
    if(userid == null){
      this.router.navigate(['bibliokie/admin/books']);
      return;
    }
    this.spinnerService.show();
    this.userId = Number(userid);
    this.getBookingLoans();
    this.getUser();
  }

  getBookingLoans(): void{
    this.spinnerService.show();
	  this.bookingLoanService.findByUserId(this.userId).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processGetBookingLoansResponse(responseDto);
        this.refreshBookingLoansPagedList();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processGetBookingLoansResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
		 let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
     this.errorMessage = bodyErrorDto.message;
		 return;
	  }
	  let bodyReponse: BookingLoanDTO[] = responseDto.body as BookingLoanDTO[];
	  this.listBookingLoans = bodyReponse;
    this.collectionSize = bodyReponse.length;
  }

  getUser():void{
    this.userSharedService.findById(this.userId).subscribe({
      next: (responseDto) => {
        this.processGetUserResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processGetUserResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    let bodyReponse: UserDTO = responseDto.body as UserDTO;
    this.userName = bodyReponse.name +" "+ bodyReponse.lastName;
  }

  refreshBookingLoansPagedList():void{
    this.pagedListBookingLoans = this.listBookingLoans.slice((this.page -1) * this.pageSize,(this.page -1) * this.pageSize + this.pageSize);
  }

  openDeleteModal(id: number, bookTitle:string, clientName:string):void {
    this.modalBody = '¿Estas seguro de eliminar la reserva del libro '+ bookTitle + ' del usuario '+ clientName+ ' de forma definitiva?';
    this.modalButtons = [
      {
        label: 'Eliminar',
        type: 'danger',
        action: () => this.deleteBookingLoan(id)
      },
      {
        label: 'Cancelar',
        type: 'secondary',
        action: () => {}
      }
    ];

    this.deleteModal.open();
  }

  deleteBookingLoan(id:number):void{
    this.spinnerService.show();
    this.bookingLoanService.delete(id).subscribe({
      next: () => {
        this.spinnerService.hide();
        this.getBookingLoans();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  
  onSort({ column, direction }: SortEvent) {
    const compare = (v1: string | number | boolean | Date, v2: string | number | boolean | Date) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }
  
    if (direction !== '' || column !== '') {
      const col = column as keyof BookingLoanDTO;
      this.pagedListBookingLoans = [...this.pagedListBookingLoans].sort((a, b) => {
        const aVal = a[col];
        const bVal = b[col];
        if (aVal === undefined || bVal === undefined) return 0; 
        const res = compare(aVal, bVal);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
