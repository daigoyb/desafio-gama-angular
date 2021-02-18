import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router: Router
  ){

  }

  canActivate():  boolean  {
    if(this.authService.isLogged()){
      this.router.navigate(['dashboard'])
      return false;
    }
    return true
  }
  
}
