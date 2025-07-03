import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { ResponseDto } from '../dtos/reponseDto';
import { catchError, map, Observable, of } from 'rxjs';
import { BookDTO } from '../dtos/books/bookDTO';
import { BookUpdateDTO } from '../dtos/books/bookUpdateDTO';

@Injectable({
  providedIn: 'root'
})
export class BooksSharedService {
  private bookUrl = environment.apiBaseUrl + '/books';

  constructor(private http: HttpClient) { }


  findByTitleAndAuthorAndIsbnAndGenre(title:string,author:string,isbn:string,genre:string): Observable<ResponseDto>{
    const params = { title, author, isbn,genre };
    return this.http.get<BookDTO>(this.bookUrl, { params,observe: 'response' })
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
    return this.http.delete<void>(this.bookUrl+"/"+id.toString(), {observe: 'response'})
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
    return this.http.get<BookDTO>(`${this.bookUrl}/${id}`, { observe: 'response' })
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

  update(id:number,bookUpdateDTO:BookUpdateDTO): Observable<ResponseDto>{
    return this.http.put<BookDTO>(`${this.bookUrl}/${id}`, bookUpdateDTO, { observe: 'response' })
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
