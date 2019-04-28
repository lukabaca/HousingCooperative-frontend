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

  languageList = [
    { code: 'en', label: 'English' },
    { code: 'pl', label: 'हिंदी' },
  ];
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              @Inject(LOCALE_ID) protected localeId: string,
              private translate: TranslateService
             ) {
  }

  ngOnInit() {
    console.log(this.localeId);
  }

  canActivate() {
    return this.authenticationService.isUserLoggedIn();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
