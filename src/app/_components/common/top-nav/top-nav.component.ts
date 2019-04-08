import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../_services/authentication.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor() { }

  ngOnInit(private authenticationService: AuthenticationService) {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
