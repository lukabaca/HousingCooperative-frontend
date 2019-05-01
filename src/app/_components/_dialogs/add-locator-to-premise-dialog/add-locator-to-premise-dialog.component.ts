import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AuthenticationService} from '../../../_services/authentication.service';
import {User} from '../../../_models/user';

@Component({
  selector: 'app-add-locator-to-premise-dialog',
  templateUrl: './add-locator-to-premise-dialog.component.html',
  styleUrls: ['./add-locator-to-premise-dialog.component.scss']
})
export class AddLocatorToPremiseDialogComponent implements OnInit {

  users: User[];
  selectedUser: User;
  constructor(public dialogRef: MatDialogRef<AddLocatorToPremiseDialogComponent>,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.authenticationService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
