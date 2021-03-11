import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public api: ApiService, public router: Router) {}

  canActivate(): boolean {
    // if (!this.api.isTokenValid()) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    return true;
  }
}
