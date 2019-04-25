import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Premise} from '../../../_models/premise';

@Component({
  selector: 'app-add-premises-dialog',
  templateUrl: './add-premises-dialog.component.html',
  styleUrls: ['./add-premises-dialog.component.scss']
})
export class AddPremisesDialogComponent implements OnInit {

  title: string;
  buttonConfirmText: string;
  premise: Premise;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddPremisesDialogComponent>) {
    if (data && data.premises) {
      this.title = 'Edytuj lokal';
      this.buttonConfirmText = ' Zapisz';
      this.premise = Object.assign({}, data.premises);
    } else {
      this.title = 'Dodaj lokal';
      this.buttonConfirmText = ' Dodaj';
      this.premise = new Premise();
    }
  }

  ngOnInit() {
  }

  canAdd() {
    return this.premise.space && this.premise.number && this.premise.roomCount;
  }

}
