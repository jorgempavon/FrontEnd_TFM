import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SortEvent } from '../../dtos/shortDto';
import { PenaltyDTO } from '../../dtos/penalties/penaltyDTO';
import { ResponseDto } from '../../dtos/reponseDto';
import { BodyErrorDto } from '../../dtos/bodyErrorDto';
import { TableSortableDirective } from '../../directives/table-sortable.directive';
import { DynamicModalComponent } from '../dynamic-modal/dynamic-modal.component';
import { ModalButton } from '../../dtos/modalButtonDto';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';
import { PenaltyService } from '../../services/penalty.service';
import { UserSharedService } from '../../services/user-shared.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserDTO } from '../../dtos/users/userDto';
import { TemporaryPeriodPenaltyService } from '../../services/temporary-period-penalty.service';
import { BookingPeriodPenaltyService } from '../../services/booking-period-penalty.service';

@Component({
  selector: 'app-penalties-view',
  templateUrl: './penalties-view.component.html',
  styleUrls: ['./penalties-view.component.css']
})
export class PenaltiesViewComponent {
  userName!:string;
  userId!:number;
  errorMessage:string = '';
  successMessage:string = '';
  page = 1;
  pageSize = 4;
  collectionSize!:number;
  listPenalties!: PenaltyDTO[];
  pagedListPenalties!: PenaltyDTO[];
  @ViewChildren(TableSortableDirective) headers!: QueryList<TableSortableDirective>;
  @ViewChild(DynamicModalComponent) deleteModal!:DynamicModalComponent;
  modalTitle:string = 'Eliminar penalización';
  modalBody!:string;
  modalButtons!:ModalButton[];
  editTemporaryPenaltyUrl!: string;
  editBookingPenaltyUrl!: string;
  isAdmin!:boolean;
  filterFulfilled:boolean = false;

  constructor(private fb: FormBuilder,private router:Router,private route: ActivatedRoute, 
    private penaltyService:PenaltyService, private spinnerService:SpinnerService,
    private userSharedService:UserSharedService, private tokenService:TokenService,
    private temporaryPeriodPenaltyService:TemporaryPeriodPenaltyService,
    private bookingPeriodPenaltyService:BookingPeriodPenaltyService) {
    this.isAdmin = this.tokenService.getIsAdmin();

    if(this.isAdmin){
      this.editTemporaryPenaltyUrl = '/bibliokie/admin/penalties/temporaryPenaltyView/';
      this.editBookingPenaltyUrl = '/bibliokie/admin/penalties/bookingPenaltyView/';
    }
    else{
      this.editTemporaryPenaltyUrl = '/bibliokie/client/penalties/temporaryPenaltyView/';
      this.editBookingPenaltyUrl = '/bibliokie/client/penalties/bookingPenaltyView/';
    }
  }
  
  ngOnInit() {
    const userid = this.route.snapshot.paramMap.get('userid');
    if(userid == null){
      this.router.navigate(['']);
      return;
    }
    this.spinnerService.show();
    this.userId = Number(userid);
    this.getPenalties();
    this.getUser();
  }

  getPenalties(): void{
    this.spinnerService.show();
    this.penaltyService.findByUserAndFulfilled(this.userId,this.filterFulfilled).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processGetPenaltiesResponse(responseDto);
        this.refreshPenaltiesPagedList();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processGetPenaltiesResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
     let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
     this.errorMessage = bodyErrorDto.message;
     return;
    }
    let bodyReponse: PenaltyDTO[] = responseDto.body as PenaltyDTO[];
    this.listPenalties = bodyReponse;
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

  refreshPenaltiesPagedList():void{
    this.pagedListPenalties = this.listPenalties.slice((this.page -1) * this.pageSize,(this.page -1) * this.pageSize + this.pageSize);
  }

  openDeleteModal(id: number, bookTitle:string, clientName:string, type:string):void {
    this.modalBody = '¿Estas seguro de eliminar la penalización del libro '+ bookTitle + ' reservado por '+ clientName+ ' de forma definitiva?';
    this.modalButtons = [
      {
        label: 'Eliminar',
        type: 'danger',
        action: () => (type == "temporal" ? this.deleteTemporaryPeriodPenalty(id):this.deleteBookingPeriodPenalty(id))
      },
      {
        label: 'Cancelar',
        type: 'secondary',
        action: () => {}
      }
    ];

    this.deleteModal.open();
  }

  deleteTemporaryPeriodPenalty(id:number):void{
    this.spinnerService.show();
    this.temporaryPeriodPenaltyService.delete(id).subscribe({
      next: () => {
        this.spinnerService.hide();
        this.getPenalties();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  
  deleteBookingPeriodPenalty(id:number):void{
    this.spinnerService.show();
    this.bookingPeriodPenaltyService.delete(id).subscribe({
      next: () => {
        this.spinnerService.hide();
        this.getPenalties();
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
      const col = column as keyof PenaltyDTO;
      this.pagedListPenalties = [...this.pagedListPenalties].sort((a, b) => {
        const aVal = a[col];
        const bVal = b[col];
        if (aVal === undefined || bVal === undefined) return 0; 
        const res = compare(aVal, bVal);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
