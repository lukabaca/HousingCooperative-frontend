import { Component, OnInit } from '@angular/core';
import {HousingCooperativeService} from '../../../_services/housingCooperative.service';
import {Router} from '@angular/router';
import {Building} from '../../../_models/building';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {

  buildings: Building[];
  constructor(private housingCooperativeService: HousingCooperativeService,
              private router: Router) { }

  ngOnInit() {
    this.getBuildings();
  }

  getBuildings() {
    this.housingCooperativeService.getBuildings().subscribe((buildings: Building[]) => {
      this.buildings = buildings;
      console.log(this.buildings);
    });
  }

}
