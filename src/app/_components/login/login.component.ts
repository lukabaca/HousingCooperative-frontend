import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {User} from '../../_models/user';
import {Router} from '@angular/router';
import {error} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  user: User;
  wrongCredentials: string;
  ngOnInit() {
    this.user = new User();
  }

  login() {
    // const email = 'adam@gmail.com';
    // const pswd = '1234';
    // let user = new User();
    // user.email = email;
    // user.password = pswd;
    if (this.user.email && this.user.password) {
      this.authenticationService.login(this.user).subscribe(res => {
      },error => {
          console.log(error);
          this.wrongCredentials = 'Błędne dane logowania';
      });
    }
  }

  test() {
    const test = this.authenticationService.getUsers().subscribe((users: User[]) => {
    });
  }

}
