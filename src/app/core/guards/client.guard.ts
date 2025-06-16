import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { TokenService } from '../services/token.service'; // Asumo que tienes un servicio para el token
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = this.tokenService.getToken();
    const isAdmin:boolean = this.tokenService.getIsAdmin();

    if (token && !isAdmin) {
      return true;
    }
    else if(token && isAdmin){
      return this.router.createUrlTree(['/admin']);
    }
    return this.router.createUrlTree(['/login']);
  }
}
