import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PremisesService} from '../../../_services/premises.service';
import {Premise} from '../../../_models/premise';
import {AddPremisesDialogComponent} from '../../_dialogs/add-premises-dialog/add-premises-dialog.component';
import {AddLocatorToPremiseDialogComponent} from '../../_dialogs/add-locator-to-premise-dialog/add-locator-to-premise-dialog.component';
import {MatDialog} from '@angular/material';
import {User} from '../../../_models/user';

@Component({
  selector: 'app-premises-details',
  templateUrl: './premises-details.component.html',
  styleUrls: ['./premises-details.component.scss']
})
export class PremisesDetailsComponent implements OnInit {

  premisesId: string;
  premise: Premise;
  constructor(private route: ActivatedRoute,
              private premisesService: PremisesService,
              private dialog: MatDialog) {
    if (this.route.snapshot.params.id) {
      this.premisesId = this.route.snapshot.params.id;
    }
  }
  
  ngOnInit() {
    console.log('premise id: ', this.premisesId);
    this.getPremise();
  }

  addPerson() {
    const dialogRef = this.dialog.open(AddLocatorToPremiseDialogComponent, {
      height: '250px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((person: User) => {
      if (person) {
        console.log('close: ', person);
        this.premisesService.addLocatorToPremises(this.premisesId, person.id).subscribe(res => {
          this.getPremise();
        });
      }
    });
  }

  getPremise() {
    this.premisesService.getPremise(this.premisesId).subscribe((premise: Premise) => {
      if (premise) {
        this.premise = premise;
        console.log('premise: ', this.premise);
      }
    });
  }

  deleteLocator(locatorId) {
    if (!locatorId) {
      return;
    }
    this.premisesService.deleteLocatorFromPremise(this.premisesId, locatorId).subscribe(res => {
      this.getPremise();
    });
  }
}
