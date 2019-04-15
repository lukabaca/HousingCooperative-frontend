import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../_services/authentication.service";
import {User} from "../../../_models/user";
import {MatTableDataSource} from "@angular/material";
import {DataTableConfigurator} from "../../../_helpers/dataTableConfigurator";

@Component({
  selector: 'app-locators',
  templateUrl: './locators.component.html',
  styleUrls: ['./locators.component.scss']
})
export class LocatorsComponent extends DataTableConfigurator implements OnInit {
  users: User[];
  columnKeys: string[] = ['id', 'email'];
  displayedColumns = [
    {
      "key": "id",
      "name": "id"
    },
    {
      "key": "email",
      "name": "email"
    },
  ];
  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.getLocators();
  }

  getLocators() {
    this.authenticationService.getUsers().subscribe((locators: User[]) => {
        this.users = locators;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
    });
  }

  registerUser() {

  }
}
