import { Component } from '@angular/core';
import { BodyErrorDto } from '../../dtos/bodyErrorDto';
import { ResponseDto } from '../../dtos/reponseDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';
import { DynamicFormField } from '../../dtos/dynamicFormField';
import { PenaltyService } from '../../services/penalty.service';
import { TemporaryPeriodPenaltyService } from '../../services/temporary-period-penalty.service';
import { PenaltyJustificationDTO } from '../../dtos/penalties/penaltyJustificationDTO';
import { TokenService } from '../../../core/services/token.service';
import { TemporaryPeriodPenaltyDTO } from '../../dtos/penalties/temporaryPeriodPenaltyDTO';
import { PenaltyDTO } from '../../dtos/penalties/penaltyDTO';

@Component({
  selector: 'app-temporary-period-penalty-view',
  templateUrl: './temporary-period-penalty-view.component.html',
  styleUrls: ['./temporary-period-penalty-view.component.css']
})
export class TemporaryPeriodPenaltyViewComponent {
 fields: DynamicFormField[] = [
    { name: 'description', label: 'Descripción', type: 'text'},
    { name: 'justificationPenalty', label: 'Justificación', type: 'text',required:true },
    { name: 'fulfilled', label: '¿Justificada?', type: 'checkbox' },
    { name: 'forgived', label: '¿Perdonada?', type: 'checkbox' },
    { name: 'bookTitle', label: 'Libro', type: 'text' },
    { name: 'clientName', label: 'Cliente', type: 'text' },
    { name: 'endDate', label: 'Fecha hasta la próxima reserva', type: 'Date' }
  ];
  errorMessage:string = '';
  successMessage:string = '';
  form!:FormGroup;
  id!:number;
  isAdmin:boolean;
  submitButtonText!:string;

  constructor(private fb: FormBuilder,private router:Router,private route: ActivatedRoute, 
  private penaltyService:PenaltyService,private temporaryPenaltyService:TemporaryPeriodPenaltyService, 
  private spinnerService:SpinnerService,private tokenService:TokenService) {
    this.isAdmin = this.tokenService.getIsAdmin();
    if(this.isAdmin){
      this.submitButtonText = 'Perdonar penalización';
    }
    else{
      this.submitButtonText = 'Cumplimentar penalización';
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id == null){
      this.router.navigate(['']);
      return;
    }
    
    this.id = Number(id);
    this.getTemporaryPenalty();
  }

  getTemporaryPenalty():void{
    this.spinnerService.show();
    this.temporaryPenaltyService.findById(this.id).subscribe({
      next: (responseDto) => {
        this.spinnerService.hide();
        this.processGetTemporaryPenaltyResponse(responseDto)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  
  updatePenalty(values:any):void{
    let justificationUpdateDto:PenaltyJustificationDTO = {
      justificationPenalty: values.justificationPenalty
    }
    this.spinnerService.show();

    if(this.isAdmin){
      this.penaltyService.forgivePenalty(this.id,justificationUpdateDto).subscribe({
        next: (responseDto) => {
          this.spinnerService.hide();
          this.processUpdatePenaltyResponse(responseDto);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
    else{
      this.penaltyService.fulfillPenalty(this.id,justificationUpdateDto).subscribe({
        next: (responseDto) => {
          this.spinnerService.hide();
          this.processUpdatePenaltyResponse(responseDto);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  processGetTemporaryPenaltyResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    let bodyReponse: TemporaryPeriodPenaltyDTO = responseDto.body as TemporaryPeriodPenaltyDTO,
    penaltyResponseDTO:PenaltyDTO = bodyReponse.penaltyDTO;

    this.form = this.fb.group({
      description: [{ value: penaltyResponseDTO.description, disabled: true }],
      justificationPenalty: [ penaltyResponseDTO.justificationPenalty,Validators.required],
      fulfilled: [{ value: penaltyResponseDTO.fulfilled, disabled: true }],
      forgived: [{ value: penaltyResponseDTO.forgived, disabled: true }],
      bookTitle: [{ value: penaltyResponseDTO.bookTitle, disabled: true }],
      clientName: [{ value: penaltyResponseDTO.clientName, disabled: true }],
      endDate: [{value:bodyReponse.endDate.toString().substring(0, 10),disabled:true}]
    });
  }

  processUpdatePenaltyResponse(responseDto:ResponseDto):void{
    if(responseDto.status != 200){
      let bodyErrorDto: BodyErrorDto = responseDto.body as BodyErrorDto;
      this.errorMessage = bodyErrorDto.message;
      return;
    }
    this.getTemporaryPenalty();
    this.successMessage = 'Penalización modificada correctamente';
  }

  deleteMessages():void{
    this.successMessage = '';
    this.errorMessage = '';
  }
}
