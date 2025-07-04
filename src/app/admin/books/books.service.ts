import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BooksSharedService } from '../../shared/services/books-shared.service';
import { BookCreateDTO } from 'src/app/shared/dtos/books/bookCreateDTO';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { BookDTO } from 'src/app/shared/dtos/books/bookDTO';
import { environment } from 'src/environment/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { BookUpdateDTO } from 'src/app/shared/dtos/books/bookUpdateDTO';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private bookUrl = environment.apiBaseUrl + '/books';
  
  constructor(private http:HttpClient) { }

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

}
