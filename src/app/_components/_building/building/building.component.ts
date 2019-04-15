import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HousingCooperativeService} from "../../../_services/housingCooperative.service";
import {Building} from "../../../_models/building";
import {DataTableConfigurator} from "../../../_helpers/dataTableConfigurator";
import {MatTableDataSource} from "@angular/material";
import {Premise} from "../../../_models/premise";

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent extends DataTableConfigurator implements OnInit {
  buildingId: string;
  building: Building;
  buildings: Building[];
  columnKeys: string[] = ['id', 'number', 'space', 'roomCount'];
  displayedColumns = [
    {
      "key": "id",
      "name": "id"
    },
    {
      "key": "number",
      "name": "numer"
    },
    {
      "key": "space",
      "name": "adres"
    },
    {
      "key": "roomCount",
      "name": "miasto"
    },
  ];
  constructor(private route: ActivatedRoute,
              private housingCooperativeService: HousingCooperativeService) {
    super();
    if (this.route.snapshot.params.id) {
      this.buildingId = this.route.snapshot.params.id;
    }
    this.getBuilding();
  }

  ngOnInit() {

  }

  addLocal() {

  }

  getBuilding() {
    if (!this.buildingId) {
      return;
    }
    this.housingCooperativeService.getBuilding(this.buildingId).subscribe((building: Building) => {
      if (building) {
        console.log(building);
        this.building = building;
        this.dataSource = new MatTableDataSource<Premise>(this.building.premises);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
