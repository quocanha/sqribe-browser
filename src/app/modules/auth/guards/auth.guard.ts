import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("AuthGaurd#canActivate called.");
    return this.login(state.url);
  }

  login(url) {
    // return true;
    if(this.authService.isAuthenticated()) {
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
