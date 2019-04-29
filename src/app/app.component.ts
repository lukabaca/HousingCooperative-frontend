import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {AuthenticationService} from './_services/authentication.service';
import {User} from './_models/user';
import {AuthGuard} from './_guards/auth.guard';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {TranslateService} from './_services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'front';

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private translate: TranslateService
             ) {
  }

  ngOnInit() {
  }

  canActivate() {
    return this.authenticationService.isUserLoggedIn();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
