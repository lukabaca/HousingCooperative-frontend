import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const loggedUserToken = this.authenticationService.getLoggedUserToken();
    if (loggedUserToken && loggedUserToken.token) {
      request = request.clone({
        setHeaders: {
          Authorization: loggedUserToken.tokenType + ' ' + loggedUserToken.token
        }
      });
    }
    return next.handle(request);
  }
}
