import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseDto } from 'src/app/shared/dtos/reponseDto';
import { RuleDTO } from 'src/app/shared/dtos/ruleDto';
import { RuleUpdateDTO } from 'src/app/shared/dtos/ruleUpdateDto';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  private rulesUrl = environment.apiBaseUrl + '/rules';

  constructor(private http: HttpClient) { }

  findByNameAndNumMimPenalties(name:string,numMimPenalties:number): Observable<ResponseDto>{
    const params = { name, numMimPenalties };
    return this.http.get<RuleDTO>(this.rulesUrl, { params,observe: 'response' })
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
    return this.http.get<RuleDTO>(`${this.rulesUrl}/${id}`, { observe: 'response' })
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

  update(id:number,ruleUpdateDto:RuleUpdateDTO): Observable<ResponseDto>{
    return this.http.put<RuleDTO>(`${this.rulesUrl}/${id}`, ruleUpdateDto, { observe: 'response' })
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
