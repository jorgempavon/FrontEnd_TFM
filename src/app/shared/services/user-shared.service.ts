import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { UserSelfUpdateDTO } from '../dtos/users/userSelfUpdateDto';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseDto } from '../dtos/reponseDto';
import { SessionDTO } from '../dtos/users/sessionDto';
import { LoginDto } from '../dtos/users/loginDto';
import { UserDTO } from '../dtos/users/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserSharedService {

  private userUrl = environment.apiBaseUrl + '/users';
  
  constructor(private http: HttpClient) { }

  updateSelf(userSelfUpdateDTO:UserSelfUpdateDTO): Observable<ResponseDto>{
    return this.http.put<UserDTO>(`${this.userUrl}/myself`, userSelfUpdateDTO, { observe: 'response' })
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
    return this.http.get<UserDTO>(`${this.userUrl}/${id}`, { observe: 'response' })
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
    return this.http.post<void>(`${this.userUrl}/logOut`, null, { observe: 'response' })
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
