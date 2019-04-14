import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {User} from '../../_models/user';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {error} from 'util';

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
    this.user = new User();
    this.return = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    // const email = 'adam@gmail.com';
    // const pswd = '1234';
    // let user = new User();
    // user.email = email;
    // user.password = pswd;
    if (this.user.email && this.user.password) {
      this.authenticationService.login(this.user).subscribe(res => {
        setTimeout(() => {
          this.router.navigate([('home')]);
        }, 300);
      },error => {
          this.wrongCredentials = 'Błędne dane logowania';
      });
    }
  }

  test() {
    const test = this.authenticationService.getUsers().subscribe((users: User[]) => {
    });
  }

}
