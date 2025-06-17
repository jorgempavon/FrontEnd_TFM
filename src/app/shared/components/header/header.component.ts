import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { SpinnerService } from '../../services/spinner.service';
import { TokenService } from '../../../core/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isUserAdmin:boolean = false;

  constructor(private authService:AuthService,private spinnerService:SpinnerService
    ,private tokenService:TokenService, private router:Router){
      if(tokenService.getIsAdmin()){
        this.isUserAdmin = true;
      }
  }

  logOut(): void{
    this.spinnerService.show();
    this.authService.logOut().subscribe({
      next: () => {
        this.spinnerService.hide();
        this.tokenService.clearSession();
        this.router.navigate(['auth/login']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
