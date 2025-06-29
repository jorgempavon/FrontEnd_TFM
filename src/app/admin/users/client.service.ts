import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { UserCreateDTO } from 'src/app/shared/dtos/userCreateDto';
import { UserDTO } from 'src/app/shared/dtos/userDto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientUrl = environment.apiBaseUrl + '/users/client';

  constructor(private http: HttpClient ) { }

  create(userCreateDTO:UserCreateDTO): Observable<ResponseDto>{
    return this.http.post<UserDTO>(this.clientUrl,userCreateDTO, {observe: 'response'})
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
    return this.http.delete<void>(this.clientUrl+"/"+id.toString(), {observe: 'response'})
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
}
