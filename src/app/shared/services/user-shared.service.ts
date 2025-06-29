import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { UserSelfUpdateDTO } from '../dtos/userSelfUpdateDto';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseDto } from '../dtos/reponseDto';
import { SessionDTO } from '../dtos/sessionDto';
import { LoginDto } from '../dtos/loginDto';

@Injectable({
  providedIn: 'root'
})
export class UserSharedService {

  private userUrl = environment.apiBaseUrl + '/users';
  
  constructor(private http: HttpClient) { }

  updateSelf(userSelfUpdateDTO:UserSelfUpdateDTO): Observable<ResponseDto>{
    return this.http.put<UserSelfUpdateDTO>(`${this.userUrl}/myself`, userSelfUpdateDTO, { observe: 'response' })
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
    return this.http.get<UserSelfUpdateDTO>(`${this.userUrl}/${id}`, { observe: 'response' })
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
    login(loginDto: LoginDto): Observable<ResponseDto> {
    return this.http.post<SessionDTO>(`${this.userUrl}/login`, loginDto, { observe: 'response' })
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

  logOut():Observable<ResponseDto>{
    return this.http.post<SessionDTO>(`${this.userUrl}/logOut`, null, { observe: 'response' })
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
