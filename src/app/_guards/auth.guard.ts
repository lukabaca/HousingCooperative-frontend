import {EventEmitter, Injectable, Output} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  @Output()
  authorClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.getCurrentLoggedUser();
    if (currentUser) {
      if (route.data.roles && route.data.roles.indexOf(currentUser.role.name) === -1) {
        this.router.navigate(['accessForbidden']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  hasRole(roles) {
    const currentLoggedUser = this.authenticationService.getCurrentLoggedUser();
    if (!currentLoggedUser) {
      this.router.navigate(['/login']);
      return false;
    }
    return !(roles.indexOf(currentLoggedUser.role.name) === -1);
  }
}
