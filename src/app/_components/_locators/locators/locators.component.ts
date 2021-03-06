import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../_services/authentication.service";
import {User} from "../../../_models/user";
import {MatTableDataSource} from "@angular/material";
import {DataTableConfigurator} from "../../../_helpers/dataTableConfigurator";
import {Router} from '@angular/router';
import {SnackBarGenerator} from '../../../_helpers/snackBarGenerator';

@Component({
  selector: 'app-locators',
  templateUrl: './locators.component.html',
  styleUrls: ['./locators.component.scss']
})
export class LocatorsComponent extends DataTableConfigurator implements OnInit {
  users: User[];
  columnKeys: string[] = ['id', 'email', 'userInfo.name', 'userInfo.surname',
    'userInfo.birthDate', 'role.value', 'enabled'];
  displayedColumns = [
    {
      "key": "id",
      "name": "id",
    },
    {
      "key": "email",
      "name": "email",
    },
    {
      "key": 'userInfo',
      "name": "imie",
    },
  ];
  isLoading: boolean;
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private snackBar: SnackBarGenerator) {
    super();
    this.isLoading = true;
  }

  ngOnInit() {
    this.getLocators();
  }

  getLocators() {
    this.authenticationService.getUsers().subscribe((locators: User[]) => {
        this.users = locators;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
    });
  }

  registerUser() {
    this.router.navigate(['locator']);
  }

  editLocator(element, event) {
    if (element) {
      this.router.navigate(['locator', element.id]);
    }
  }

}
