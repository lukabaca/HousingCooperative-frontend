import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Premise} from '../../../_models/premise';

@Component({
  selector: 'app-add-premises-dialog',
  templateUrl: './add-premises-dialog.component.html',
  styleUrls: ['./add-premises-dialog.component.scss']
})
export class AddPremisesDialogComponent implements OnInit {
  premise: Premise;
  isEditing: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddPremisesDialogComponent>) {
    if (data && data.premises) {
      this.isEditing = true;
      this.premise = Object.assign({}, data.premises);
    } else {
      this.isEditing = false;
      this.premise = new Premise();
    }
  }

  ngOnInit() {
  }

  canAdd() {
    return this.premise.space && this.premise.number && this.premise.roomCount;
  }

}
