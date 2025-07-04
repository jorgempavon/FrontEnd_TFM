import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { UserCreateDTO } from 'src/app/shared/dtos/users/userCreateDto';
import { UserDTO } from 'src/app/shared/dtos/users/userDto';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminUrl = environment.apiBaseUrl + '/users/admin';

  constructor(private http: HttpClient) { }

  create(userCreateDTO:UserCreateDTO): Observable<ResponseDto>{
    return this.http.post<UserDTO>(this.adminUrl,userCreateDTO, {observe: 'response'})
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
    return this.http.delete<void>(this.adminUrl+"/"+id.toString(), {observe: 'response'})
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
