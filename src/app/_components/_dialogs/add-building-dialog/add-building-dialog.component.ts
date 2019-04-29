import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Building} from '../../../_models/building';
import {HousingCooperativeService} from '../../../_services/housingCooperative.service';
import {HousingCooperative} from '../../../_models/housingCooperative';

@Component({
  selector: 'app-add-building-dialog',
  templateUrl: './add-building-dialog.component.html',
  styleUrls: ['./add-building-dialog.component.scss']
})

export class AddBuildingDialogComponent implements OnInit {

  building: Building;
  isEditing: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddBuildingDialogComponent>,) {
    if (data && data.building) {
      this.building = Object.assign({}, data.building);
      this.isEditing = true;
    } else {
      this.building = new Building();
      this.isEditing = false;
    }
  }

  ngOnInit() {
  }

  canAdd() {
    return this.building.address && this.building.city && this.building.number >= 0;
  }

}
