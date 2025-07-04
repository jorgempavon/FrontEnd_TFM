import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { UserDTO } from 'src/app/shared/dtos/users/userDto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { UserCreateDTO } from 'src/app/shared/dtos/users/userCreateDto';
import { UserAdminUpdateDto } from 'src/app/shared/dtos/users/userAdminUpdateDto';
import { UserSharedService } from 'src/app/shared/services/user-shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = environment.apiBaseUrl + '/users';

  constructor(private http: HttpClient, private userSharedService:UserSharedService) { }


  findByNameAndDniAndEmail(name:string,dni:string,email:string): Observable<ResponseDto>{
    const params = { name, dni, email };
    return this.http.get<UserDTO>(this.userUrl, { params,observe: 'response' })
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

  update(id:number,userAdminUpdateDto:UserAdminUpdateDto): Observable<ResponseDto>{
    return this.http.put<UserDTO>(`${this.userUrl}/${id}`, userAdminUpdateDto, { observe: 'response' })
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

  findById(id:number):Observable<ResponseDto>{
    return this.userSharedService.findById(id);
  }
}
