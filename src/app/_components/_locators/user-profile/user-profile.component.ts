import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../_services/authentication.service';
import {User} from '../../../_models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfile: User;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.getUserProfileData();
  }

  getUserProfileData() {
    this.authService.getUserData().subscribe((user: User) => {
      if (user) {
        this.userProfile = user;
      }
    });
  }
}
