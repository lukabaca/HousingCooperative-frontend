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

  title: string;
  buttonConfirmText: string;
  building: Building;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddBuildingDialogComponent>,) {
    if (data && data.building) {
      this.title = 'Edytuj budynek';
      this.buttonConfirmText = 'Zapisz';
      this.building = Object.assign({}, data.building);
      console.log(this.building);
    } else {
      this.title = 'Dodaj budynek';
      this.buttonConfirmText = 'Dodaj';
      this.building = new Building();
    }
  }

  ngOnInit() {
  }

  canAdd() {
    return this.building.address && this.building.city && this.building.number;
  }

}
