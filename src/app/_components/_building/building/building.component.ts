import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HousingCooperativeService} from "../../../_services/housingCooperative.service";
import {Building} from "../../../_models/building";
import {DataTableConfigurator} from "../../../_helpers/dataTableConfigurator";
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Premise} from "../../../_models/premise";
import {AddBuildingDialogComponent} from '../../_dialogs/add-building-dialog/add-building-dialog.component';
import {AddPremisesDialogComponent} from '../../_dialogs/add-premises-dialog/add-premises-dialog.component';
import {PremisesService} from '../../../_services/premises.service';

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
  isLoading: boolean;
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
      "name": "powierzchnia"
    },
    {
      "key": "roomCount",
      "name": "liczba pokoi"
    },
  ];
  constructor(private route: ActivatedRoute,
              private housingCooperativeService: HousingCooperativeService,
              private premisesService: PremisesService,
              private dialog: MatDialog) {
    super();
    this.isLoading = true;
    if (this.route.snapshot.params.id) {
      this.buildingId = this.route.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.getBuilding();
  }

  addLocal() {
    const dialogRef = this.dialog.open(AddPremisesDialogComponent, {
      height: '400px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((premise: Premise) => {
      if (premise) {
        console.log(premise);
        if (this.buildingId) {
          premise.buildingId = Number(this.buildingId);
          this.premisesService.addPremise(premise).subscribe((response: Response) => {
            console.log(response);
            this.getBuilding();
          });
        }
      }
    });
  }

  getBuilding() {
    if (!this.buildingId) {
      return;
    }
    this.housingCooperativeService.getBuilding(this.buildingId).subscribe((building: Building) => {
      if (building) {
        this.building = building;
        this.dataSource = new MatTableDataSource<Premise>(this.building.premises);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    });
  }
}
