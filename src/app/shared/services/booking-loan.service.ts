import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ResponseDto } from '../dtos/reponseDto';
import { BookingLoanCreateDTO } from '../dtos/bookingLoanCreateDTO';
import { BookingLoanDTO } from '../dtos/bookingLoanDTO';
import { BookingLoanUpdateDTO } from '../dtos/bookingLoanUpdateDTO';

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

  findByUserId(userId:number):Observable<ResponseDto>{
    const params = { userId };
    return this.http.get<BookingLoanDTO>(this.bookingLoanUrl, { params,observe: 'response' })
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
    return this.http.delete<void>(this.bookingLoanUrl+"/"+id.toString(), {observe: 'response'})
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
    return this.http.get<BookingLoanDTO>(`${this.bookingLoanUrl}/${id}`, { observe: 'response' })
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

  update(id:number,bookingLoanUpdateDto:BookingLoanUpdateDTO): Observable<ResponseDto>{
    return this.http.put<BookingLoanDTO>(`${this.bookingLoanUrl}/${id}`, bookingLoanUpdateDto, { observe: 'response' })
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
