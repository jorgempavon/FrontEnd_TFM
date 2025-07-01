import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { RuleCreateDTO } from 'src/app/shared/dtos/ruleCreateDto';
import { RuleDTO } from 'src/app/shared/dtos/ruleDto';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingPeriodRuleService {

  private bookingRuleUrl = environment.apiBaseUrl + '/rules/bookingPeriodRule';

  constructor(private http: HttpClient ) { }

  create(userCreateDTO:RuleCreateDTO): Observable<ResponseDto>{
    return this.http.post<RuleDTO>(this.bookingRuleUrl,userCreateDTO, {observe: 'response'})
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
  
  delete(id:number): Observable<ResponseDto>{
    return this.http.delete<void>(this.bookingRuleUrl+"/"+id.toString(), {observe: 'response'})
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
}
