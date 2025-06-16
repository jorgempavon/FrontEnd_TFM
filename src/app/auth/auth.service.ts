import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { catchError, map, Observable, of } from 'rxjs';
import { SessionDTO } from '../shared/dtos/sessionDto';
import { LoginDto } from '../shared/dtos/loginDto';
import { ResponseDto } from '../shared/dtos/reponseDto';
import { environment } from 'src/environment/environment';
import { RegisterDto } from '../shared/dtos/registerDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = environment.apiBaseUrl + '/authentication';
  
  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<ResponseDto> {
    return this.http.post<SessionDTO>(`${this.authUrl}/login`, loginDto, { observe: 'response' })
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

  register(registerDto: RegisterDto): Observable<ResponseDto> {
    return this.http.post<SessionDTO>(`${this.authUrl}/register`, registerDto, { observe: 'response' })
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


