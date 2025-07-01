import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BooksSharedService } from '../../shared/services/books-shared.service';
import { BookCreateDTO } from 'src/app/shared/dtos/bookCreateDTO';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BookDTO } from 'src/app/shared/dtos/bookDTO';
import { environment } from 'src/environment/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { BookUpdateDTO } from 'src/app/shared/dtos/bookUpdateDTO';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private bookUrl = environment.apiBaseUrl + '/books';
  
  constructor(private http:HttpClient,private booksSharedService:BooksSharedService) { }

  create(bookCreateDTO:BookCreateDTO): Observable<ResponseDto>{
    return this.http.post<BookDTO>(this.bookUrl,bookCreateDTO, {observe: 'response'})
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

  findByTitleAndAuthorAndIsbnAndGenre(title:string,author:string,isbn:string,genre:string): Observable<ResponseDto>{
    return this.booksSharedService.findByTitleAndAuthorAndIsbnAndGenre(title,author,isbn,genre);
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
