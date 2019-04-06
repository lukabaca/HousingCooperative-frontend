import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {User} from '../../_models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    const email = 'adam@gmail.com';
    const pswd = '1234';
    let user = new User();
    user.email = email;
    user.password = pswd;
    this.authenticationService.login(user).subscribe();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  test() {
    const test = this.authenticationService.getUsers().subscribe((users: User[]) => {
    });
  }

}
