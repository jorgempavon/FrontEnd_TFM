import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TableSortableDirective } from 'src/app/shared/directives/table-sortable.directive';
import { SortEvent } from 'src/app/shared/dtos/shortDto';
import { UserDTO } from 'src/app/shared/dtos/userDto';
import { UserServiceAdmin } from '../userAdmin.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { DynamicModalComponent } from 'src/app/shared/components/dynamic-modal/dynamic-modal.component';
import { ModalButton } from 'src/app/shared/dtos/modalButtonDto';

@Component({
  selector: 'app-usersview',
  templateUrl: './usersview.component.html',
  styleUrls: ['./usersview.component.css']
})
export class UsersviewComponent {
  page = 1;
  pageSize = 4;
  collectionSize!:number;
  listUsers!: UserDTO[];
  pagedListUsers!: UserDTO[];
  filterName:string='';
  filterEmail:string='';
  filterDni:string='';
  @ViewChildren(TableSortableDirective) headers!: QueryList<TableSortableDirective>;

  @ViewChild(DynamicModalComponent) deleteModal!:DynamicModalComponent;
  modalTitle:string = 'Eliminar usuario';
  modalBody!:string;
  modalButtons!:ModalButton[];

  createUserUrl:string = 'bibliokie/admin/users/createUser';
  editUserUrl:string = 'bibliokie/admin/users/userView/';

  constructor(private userServiceAdmin:UserServiceAdmin, private spinnerService:SpinnerService) {

  }

  ngOnInit(): void{
    this.getUsersList();
  }

  getUsersList():void{
    this.spinnerService.show();
	  this.userServiceAdmin.findByNameAndDniAndEmail(this.filterName,this.filterDni,this.filterEmail).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processGetUsersResponse(responseDto);
        this.refreshUsersPagedList()
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  refreshUsersPagedList(){
    this.pagedListUsers = this.listUsers.slice((this.page -1) * this.pageSize,(this.page -1) * this.pageSize + this.pageSize);
  }

	processGetUsersResponse(responseDto:ResponseDto):void{
	  if(responseDto.status != 200){
		 let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
		 return;
	  }
	  let bodyReponse: UserDTO[] = responseDto.body as UserDTO[];
	  this.listUsers = bodyReponse;
    this.collectionSize = bodyReponse.length;
	}

  onSort({ column, direction }: SortEvent) {
	  const compare = (v1: string | number | boolean, v2: string | number | boolean) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }
	
    if (direction !== '' || column !== '') {
      const col = column as keyof UserDTO;
      this.pagedListUsers = [...this.pagedListUsers].sort((a, b) => {
        const aVal = a[col];
        const bVal = b[col];
        if (aVal === undefined || bVal === undefined) return 0; 
        const res = compare(aVal, bVal);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  deleteUser(id:number):void{
    this.spinnerService.show();
    this.userServiceAdmin.delete(id).subscribe({
      next: () => {
        this.spinnerService.hide();
        this.getUsersList();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openDeleteModal(id: number, name:string, lastName:string | undefined) {
    this.modalBody = '¿Estas seguro de eliminar al usuario '+name+' '+ lastName+ ' de forma definitiva?';
    this.modalButtons = [
      {
        label: 'Eliminar',
        type: 'danger',
        action: () => this.deleteUser(id)
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
