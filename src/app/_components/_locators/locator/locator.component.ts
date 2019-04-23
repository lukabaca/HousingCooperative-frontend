import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../_models/user';
import {AuthenticationService} from '../../../_services/authentication.service';
import {UserInfo} from '../../../_models/userInfo';
import {Role} from '../../../_models/role';

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.scss']
})
export class LocatorComponent implements OnInit {
  user: User;
  roles: Role[];
  isEditingUser: boolean;
  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    this.initForm();
  }
  ngOnInit() {
    this.getRoles();
  }

  initForm() {
    if (this.route.snapshot.params.id) {
      const userId = this.route.snapshot.params.id;
      this.authenticationService.getUser(userId).subscribe((user: User) => {
        if (user) {
          console.log(user);
          this.user = user;
          this.isEditingUser = true;
        }
      });
    } else {
      this.user = new User();
      this.user.userInfo = new UserInfo();
      this.user.role = new Role();
      this.isEditingUser = false;
    }
  }

  getRoles() {
    this.authenticationService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    });
  }

  onSubmit(locatorForm) {
    console.log('form: ', locatorForm);
    console.log('user to regsiter: ', this.user);
    if (this.isEditingUser) {
      this.authenticationService.editUser(this.user).subscribe(res => {
        if (res) {
          console.log('edycja usera o: ', res);
        }
      });
    } else {
      this.authenticationService.addUser(this.user).subscribe(res => {
        if (res) {
          console.log('utworzono usera o: ', res);
          locatorForm.resetForm();
        }
      });
    }
  }
}
