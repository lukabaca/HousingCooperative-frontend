import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../_services/authentication.service';
import {User} from '../../../_models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  currentlyLoggedUser: User;
  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('currentUser') != null) {
      this.currentlyLoggedUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
