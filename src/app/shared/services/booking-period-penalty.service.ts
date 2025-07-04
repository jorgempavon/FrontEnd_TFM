import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ResponseDto } from '../dtos/reponseDto';

@Injectable({
  providedIn: 'root'
})
export class BookingPeriodPenaltyService {

  private bookingPeriodUrl = environment.apiBaseUrl + '/penalties/bookingPeriodPenalties';

  constructor(private http:HttpClient) { }

    
  delete(id:number): Observable<ResponseDto>{
    return this.http.delete<void>(this.bookingPeriodUrl+"/"+id.toString(), {observe: 'response'})
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
    return this.http.get<void>(this.bookingPeriodUrl+"/"+id.toString(), {observe: 'response'})
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
