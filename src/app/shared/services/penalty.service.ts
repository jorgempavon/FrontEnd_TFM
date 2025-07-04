import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ResponseDto } from '../dtos/reponseDto';
import { PenaltyDTO } from '../dtos/penalties/penaltyDTO';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PenaltyJustificationDTO } from '../dtos/penalties/penaltyJustificationDTO';

@Injectable({
  providedIn: 'root'
})
export class PenaltyService {

  private penaltiesUrl = environment.apiBaseUrl + '/penalties';

  constructor(private http:HttpClient) { }

  findByUserAndFulfilled(userId:number,isFulfilled:boolean): Observable<ResponseDto>{
    const params = { userId,isFulfilled };
    return this.http.get<PenaltyDTO>(this.penaltiesUrl, { params,observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          let responseDto: ResponseDto = {
            status: response.status,
            body: response.body
          };
          return responseDto;
        }),
        catchError(error => {
          let responseDto: ResponseDto = {
            status: error.status,
            body: error.error 
          };
          return of(responseDto);
        })
      );
  }

  forgivePenalty(id:number,penaltyJustificationDTO:PenaltyJustificationDTO): Observable<ResponseDto>{
    return this.http.put<PenaltyDTO>(`${this.penaltiesUrl}/${id}/forgive`, penaltyJustificationDTO, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          let responseDto: ResponseDto = {
            status: response.status,
            body: response.body
          };
          return responseDto;
        }),
        catchError(error => {
          let responseDto: ResponseDto = {
            status: error.status,
            body: error.error 
          };
          return of(responseDto);
        })
      );
  }

  fulfillPenalty(id:number,penaltyJustificationDTO:PenaltyJustificationDTO): Observable<ResponseDto>{
    return this.http.put<PenaltyDTO>(`${this.penaltiesUrl}/${id}/fulfill`, penaltyJustificationDTO, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          let responseDto: ResponseDto = {
            status: response.status,
            body: response.body
          };
          return responseDto;
        }),
        catchError(error => {
          let responseDto: ResponseDto = {
            status: error.status,
            body: error.error 
          };
          return of(responseDto);
        })
      );
  }
}

