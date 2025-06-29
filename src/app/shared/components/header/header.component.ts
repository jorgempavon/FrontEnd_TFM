import { Component, Input } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { TokenService } from '../../../core/services/token.service';
import { Router } from '@angular/router';
import { DynamicNavLink } from '../../dtos/dynamicNavLink';
import { UserSharedService } from '../../services/user-shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isUserAdmin:boolean = false;
  @Input() profileUrl!:string;
  @Input() listNavs!:DynamicNavLink[];

  constructor(private userSharedService:UserSharedService,private spinnerService:SpinnerService
    ,private tokenService:TokenService, private router:Router){
      if(tokenService.getIsAdmin()){
        this.isUserAdmin = true;
      }
  }

  logOut(): void{
    this.spinnerService.show();
    this.userSharedService.logOut().subscribe({
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
