import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ResponseDto } from '../dtos/reponseDto';
import { BookingLoanCreateDTO } from '../dtos/bookingLoanCreateDTO';
import { BookingLoanDTO } from '../dtos/bookingLoanDTO';

@Injectable({
  providedIn: 'root'
})
export class BookingLoanService {
  private bookingLoanUrl = environment.apiBaseUrl + '/bookingLoans';

  constructor(private http: HttpClient) { }

  create(bookingLoanCreateDTO:BookingLoanCreateDTO): Observable<ResponseDto>{
    return this.http.post<BookingLoanDTO>(this.bookingLoanUrl,bookingLoanCreateDTO, {observe: 'response'})
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
