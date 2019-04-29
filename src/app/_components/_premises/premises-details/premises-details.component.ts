import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PremisesService} from '../../../_services/premises.service';
import {Premise} from '../../../_models/premise';

@Component({
  selector: 'app-premises-details',
  templateUrl: './premises-details.component.html',
  styleUrls: ['./premises-details.component.scss']
})
export class PremisesDetailsComponent implements OnInit {

  premisesId: string;
  premise: Premise;
  constructor(private route: ActivatedRoute,
              private premisesService: PremisesService) {
    if (this.route.snapshot.params.id) {
      this.premisesId = this.route.snapshot.params.id;
    }
  }
  
  ngOnInit() {
    console.log('premise id: ', this.premisesId);
    this.getPremise();
  }

  addPerson() {

  }

  getPremise() {
    this.premisesService.getPremise(this.premisesId).subscribe((premise: Premise) => {
      if (premise) {
        this.premise = premise;
        console.log('premise: ', this.premise);
      }
    });
  }
}
