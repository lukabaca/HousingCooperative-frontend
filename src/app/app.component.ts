import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './_services/authentication.service';
import {User} from './_models/user';
import {AuthGuard} from './_guards/auth.guard';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front';

  constructor(private authenticationService: AuthenticationService,) {

  }

  ngOnInit() {
  }

  canActivate() {
    return this.authenticationService.isUserLoggedIn();
  }
}
