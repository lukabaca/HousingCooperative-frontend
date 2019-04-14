import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {User} from '../../_models/user';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {error} from 'util';
import {overrideProvider} from '@angular/core/src/view';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
  user: User;
  wrongCredentials: string;
  return: string;
  ngOnInit() {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['home']);
    }
    this.user = new User();
    this.return = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (this.user.email && this.user.password) {
      this.wrongCredentials = "";
      this.authenticationService.login(this.user).subscribe(res => {
        setTimeout(() => {
          this.router.navigate([('home')]);
        }, 300);
      },error => {
          this.wrongCredentials = 'Błędne dane logowania';
      });
    }
  }

}
