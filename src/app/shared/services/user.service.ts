import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { UserSelfUpdateDTO } from '../dtos/userSelfUpdateDto';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseDto } from '../dtos/reponseDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authUrl = environment.apiBaseUrl + '/users';
  
  constructor(private http: HttpClient) { }

  updateSelf(userSelfUpdateDTO:UserSelfUpdateDTO): Observable<ResponseDto>{
    return this.http.put<UserSelfUpdateDTO>(`${this.authUrl}/myself`, userSelfUpdateDTO, { observe: 'response' })
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

  findById(id:number): Observable<ResponseDto>{
    return this.http.get<UserSelfUpdateDTO>(`${this.authUrl}/${id}`, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          let responseDto: ResponseDto = {
            status: response.status,
            body: response.body
          };
          console.log(responseDto);
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
