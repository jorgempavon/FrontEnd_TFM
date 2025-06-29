import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { RegisterDto } from '../dtos/registerDto';
import { ResponseDto } from '../dtos/reponseDto';
import { catchError, map, Observable, of } from 'rxjs';
import { SessionDTO } from '../dtos/sessionDto';

@Injectable({
  providedIn: 'root'
})
export class ClientSharedService {

  private clientUrl = environment.apiBaseUrl + '/users/client';

  constructor(private http: HttpClient) { }
  
  register(registerDto: RegisterDto): Observable<ResponseDto> {
    return this.http.post<SessionDTO>(`${this.clientUrl}/register`, registerDto, { observe: 'response' })
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
