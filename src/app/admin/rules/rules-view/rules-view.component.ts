import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicModalComponent } from 'src/app/shared/components/dynamic-modal/dynamic-modal.component';
import { TableSortableDirective } from 'src/app/shared/directives/table-sortable.directive';
import { ModalButton } from 'src/app/shared/dtos/modalButtonDto';
import { RuleDTO } from 'src/app/shared/dtos/ruleDto';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { BodyErrorDto } from 'src/app/shared/dtos/bodyErrorDto';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { RulesService } from '../rules.service';
import { SortEvent } from 'src/app/shared/dtos/shortDto';
import { BookingPeriodRuleService } from '../booking-period-rule.service';
import { TemporaryPeriodRuleService } from '../temporary-period-rule.service';
import { CreateBookingPeriodRuleComponent } from '../create-booking-period-rule/create-booking-period-rule.component';
import { CreateTemporaryPeriodRuleComponent } from '../create-temporary-period-rule/create-temporary-period-rule.component';

@Component({
  selector: 'app-rules-view',
  templateUrl: './rules-view.component.html',
  styleUrls: ['./rules-view.component.css']
})
export class RulesViewComponent {
  page = 1;
  pageSize = 4;
  collectionSize!:number;
  listRules!: RuleDTO[];
  pagedListRules!: RuleDTO[];
  filterName:string='';
  filterNumPenalties:number=0;
  @ViewChildren(TableSortableDirective) headers!: QueryList<TableSortableDirective>;

  @ViewChild(DynamicModalComponent) deleteModal!:DynamicModalComponent;
  modalTitle:string = 'Eliminar regla';
  modalBody!:string;
  modalButtons!:ModalButton[];

  editRuleUrl:string = 'bibliokie/admin/rules/ruleView/';

  constructor(private ruleService:RulesService, private bookingPeriodRuleService:BookingPeriodRuleService,
    private temporaryPeriodRuleService:TemporaryPeriodRuleService,private spinnerService:SpinnerService,
    private dialog:MatDialog) {

  }

  ngOnInit(): void{
    this.getRulesList();
  }

  getRulesList():void{
    this.spinnerService.show();
    this.ruleService.findByNameAndNumMimPenalties(this.filterName,this.filterNumPenalties).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processGetRulesResponse(responseDto);
        this.refreshRulesPagedList()
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  refreshRulesPagedList(){
    this.pagedListRules = this.listRules.slice((this.page -1) * this.pageSize,(this.page -1) * this.pageSize + this.pageSize);
  }

  processGetRulesResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
     let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
     return;
    }
    let bodyReponse: RuleDTO[] = responseDto.body as RuleDTO[];
    this.listRules = bodyReponse;
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
      const col = column as keyof RuleDTO;
      this.pagedListRules = [...this.pagedListRules].sort((a, b) => {
        const aVal = a[col];
        const bVal = b[col];
        if (aVal === undefined || bVal === undefined) return 0; 
        const res = compare(aVal, bVal);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  deleteBookingPeriodRule(id:number):void{
    this.spinnerService.show();
    this.bookingPeriodRuleService.delete(id).subscribe({
      next: () => {
        this.spinnerService.hide();
        this.getRulesList();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteTemporaryPeriodRule(id:number):void{
    this.spinnerService.show();
    this.temporaryPeriodRuleService.delete(id).subscribe({
      next: () => {
        this.spinnerService.hide();
        this.getRulesList();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openDeleteModal(id: number, name:string, adminName:string, type:string):void {
    this.modalBody = '¿Estas seguro de eliminar la regla denominada '+name+ ' creada por '+adminName+' de forma definitiva?';
    this.modalButtons = [
      {
        label: 'Eliminar',
        type: 'danger',
        action: () => (type == "temporal" ? this.deleteTemporaryPeriodRule(id):this.deleteBookingPeriodRule(id)) 
      },
      {
        label: 'Cancelar',
        type: 'secondary',
        action: () => {}
      }
    ];

    this.deleteModal.open();
  }

  openCreateBookingRuleModal() {
    this.dialog.open(CreateBookingPeriodRuleComponent, {
      width: '300px'
    });
  }

  openCreateTemporaryRuleModal() {
    this.dialog.open(CreateTemporaryPeriodRuleComponent, {
      width: '300px'
    });
  }

}
