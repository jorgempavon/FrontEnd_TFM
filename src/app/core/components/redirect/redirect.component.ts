import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-redirect',
  template: ''
})
export class RedirectComponent {
  constructor(private tokenService: TokenService, private router: Router) {
    const token = this.tokenService.getToken();
    const isAdmin = this.tokenService.getIsAdmin();

    if (!token) {
      this.router.navigate(['/bibliokie/auth/login']);
    } else if (isAdmin) {
      this.router.navigate(['/bibliokie/admin']);
    } else {
      this.router.navigate(['/bibliokie/client']);
    }
  }
}
