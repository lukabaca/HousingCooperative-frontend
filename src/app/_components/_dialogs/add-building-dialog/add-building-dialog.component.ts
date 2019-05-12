import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Building} from '../../../_models/building';
import {HousingCooperativeService} from '../../../_services/housingCooperative.service';
import {HousingCooperative} from '../../../_models/housingCooperative';
import {AuthenticationService} from '../../../_services/authentication.service';
import {User} from '../../../_models/user';

@Component({
  selector: 'app-add-building-dialog',
  templateUrl: './add-building-dialog.component.html',
  styleUrls: ['./add-building-dialog.component.scss']
})

export class AddBuildingDialogComponent implements OnInit {

  building: Building;
  isEditing: boolean;
  managers: User [];
  managerRoleId = 3;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddBuildingDialogComponent>,
            private authService: AuthenticationService) {
    if (data && data.building) {
      this.building = Object.assign({}, data.building);
      console.log(this.building);
      this.isEditing = true;
      this.building.managerId = this.building.manager ? this.building.manager.id.toString() : -1;
    } else {
      this.building = new Building();
      this.isEditing = false;
    }
  }

  ngOnInit() {
    this.getManagers();
  }

  canAdd() {
    return this.building.address && this.building.city && this.building.number >= 0;
  }

  getManagers() {
    this.authService.getUsers(this.managerRoleId).subscribe((managers: User[]) => {
      console.log(managers);
      this.managers = managers;
    });
  }
}
