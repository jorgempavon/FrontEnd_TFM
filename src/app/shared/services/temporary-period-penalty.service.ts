import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { ResponseDto } from '../dtos/reponseDto';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemporaryPeriodPenaltyService {
  
  private temporaryPeriodUrl = environment.apiBaseUrl + '/penalties/temporaryPeriodPenalties';

  constructor(private http:HttpClient) { }

  delete(id:number): Observable<ResponseDto>{
    return this.http.delete<void>(this.temporaryPeriodUrl+"/"+id.toString(), {observe: 'response'})
      .pipe(
        map((response: HttpResponse<any>) => {
          let responseDto: ResponseDto = {
            status: response.status,
            body: null
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

  
  findById(id:number): Observable<ResponseDto>{
    return this.http.get<void>(this.temporaryPeriodUrl+"/"+id.toString(), {observe: 'response'})
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
