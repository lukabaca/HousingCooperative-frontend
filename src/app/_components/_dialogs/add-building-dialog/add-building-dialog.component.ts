import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Building} from '../../../_models/building';

@Component({
  selector: 'app-add-building-dialog',
  templateUrl: './add-building-dialog.component.html',
  styleUrls: ['./add-building-dialog.component.scss']
})
export class AddBuildingDialogComponent implements OnInit {

  title = 'Dodaj budynek';
  building: Building;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddBuildingDialogComponent>) {
    this.building = new Building();
  }

  ngOnInit() {
  }

  canAdd() {
    return this.building.address && this.building.city && this.building.number;
  }
}
