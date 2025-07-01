import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { ResponseDto } from '../dtos/reponseDto';
import { catchError, map, Observable, of } from 'rxjs';
import { BookDTO } from '../dtos/bookDTO';

@Injectable({
  providedIn: 'root'
})
export class BooksSharedService {
  private userUrl = environment.apiBaseUrl + '/books';

  constructor(private http: HttpClient) { }


  findByTitleAndAuthorAndIsbnAndGenre(title:string,author:string,isbn:string,genre:string): Observable<ResponseDto>{
    const params = { title, author, isbn,genre };
    return this.http.get<BookDTO>(this.userUrl, { params,observe: 'response' })
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
