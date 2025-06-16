import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

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
    if(sessionStorage.getItem('role') && sessionStorage.getItem('token') == 'ADMIN'){
      isAdmin = true;
    }
    return isAdmin;
  }

  logOut():void{
    sessionStorage.clear();
  }

}
