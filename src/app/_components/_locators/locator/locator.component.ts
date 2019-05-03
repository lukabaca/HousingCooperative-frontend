import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../_models/user';
import {AuthenticationService} from '../../../_services/authentication.service';
import {UserInfo} from '../../../_models/userInfo';
import {Role} from '../../../_models/role';
import {SnackBarGenerator} from '../../../_helpers/snackBarGenerator';
import {ApiResponse} from '../../../_models/apiResponse';

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.scss']
})
export class LocatorComponent implements OnInit {
  user: User;
  roles: Role[];
  isEditingUser: boolean;
  captcha: string;
  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private snackBar: SnackBarGenerator) {
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
    if (!this.captcha) {
      return;
    }
    if (this.isEditingUser) {
      this.authenticationService.editUser(this.user).subscribe(res => {
        if (res) {
          this.snackBar.openSnackBar('Poprawnie zaktuliazowane dane użytkownika', true);
        }
      },  error => {
        this.snackBar.openSnackBar('Wystąpił błąd', false);
      });
    } else {
      this.authenticationService.addUser(this.user).subscribe((res: ApiResponse) => {
        if (res) {
          console.log(res);
          this.snackBar.openSnackBar('Poprawnie zarejestrowano użytkownika', true);
          this.authenticationService.getUser(res.id).subscribe((user: User) => {
            if (user) {
              console.log(user);
              this.authenticationService.sendActivationToken(user.id).subscribe();
            }
          });
          locatorForm.resetForm();
          this.captcha = '';
        }
      }, error => {
        this.snackBar.openSnackBar('Wystąpił błąd', false);
      });
    }
  }

  resolved(captchaResponse: string) {
   this.captcha = captchaResponse;
  }

  sendActivationToken() {
    this.authenticationService.sendActivationToken(this.user.id).subscribe( res => {
      this.snackBar.openSnackBar('Poprawnie wysłano token', true);
    }, error => {
      this.snackBar.openSnackBar('Błąd przy wysyłaniu tokena', false);
    });
  }
}
