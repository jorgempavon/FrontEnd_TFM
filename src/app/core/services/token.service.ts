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

  setRol(rol:string):void{
    if(rol == 'admin'){
      sessionStorage.setItem('rol','ADMIN');
    }
    else{
      sessionStorage.setItem('rol','CLIENT');
    }
    
  }

  getIsAdmin(): boolean {
    let isAdmin = false;
    if(sessionStorage.getItem('rol') && sessionStorage.getItem('rol') == 'ADMIN'){
      isAdmin = true;
    }
    return isAdmin;
  }

  clearSession():void{
    sessionStorage.clear();
  }

}
