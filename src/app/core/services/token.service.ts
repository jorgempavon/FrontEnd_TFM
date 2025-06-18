import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setId(id:number):void{
    sessionStorage.setItem('id',id.toString());
  }

  getId():number{
    if(!sessionStorage.getItem('id')){
      return 0;
    }
    return Number(sessionStorage.getItem('id'));
  }

  setEmail(email:string):void{
    sessionStorage.setItem('email',email);
  }

  getEmail():string{
    const email = sessionStorage.getItem('email');
    return email ?? '';
  }

  setToken(token:string):void{
    sessionStorage.setItem('token',token);
  }

  getToken(): string {
    const token = sessionStorage.getItem('token');
    return token ?? '';
  }

  setRole(isAdmin:boolean):void{
    if(isAdmin){
      sessionStorage.setItem('role','ADMIN');
    }
    else{
      sessionStorage.setItem('role','CLIENT');
    }
    
  }

  getIsAdmin(): boolean {
    let isAdmin = false;
    if(sessionStorage.getItem('role') && sessionStorage.getItem('role') == 'ADMIN'){
      isAdmin = true;
    }
    return isAdmin;
  }

  clearSession():void{
    sessionStorage.clear();
  }

}
