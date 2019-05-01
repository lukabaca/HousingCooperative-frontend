import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  columnKeys: string[] = ['id', 'number', 'space', 'roomCount', 'edit', 'delete'];
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
    {
      "key": "edit",
      "name": "Edycja"
    },
    {
      "key": "delete",
      "name": "Usuwanie"
    },
  ];
  constructor(private route: ActivatedRoute,
              private housingCooperativeService: HousingCooperativeService,
              private premisesService: PremisesService,
              private dialog: MatDialog,
              private router: Router,) {
    super();
    this.isLoading = true;
    if (this.route.snapshot.params.id) {
      this.buildingId = this.route.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.getBuilding();
  }

  getBuilding() {
    if (!this.buildingId) {
      return;
    }
    this.housingCooperativeService.getBuilding(this.buildingId).subscribe((building: Building) => {
      if (building) {
        this.isLoading = false;
        this.building = building;
        this.dataSource = new MatTableDataSource<Premise>(this.building.premises);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  deletePremise(element, event) {
    event.stopPropagation();
    if (!element) {
      return;
    }
    this.premisesService.deletePremise(element).subscribe(res => {
        this.getBuilding();
    });
  }

  addPremises() {
    const dialogRef = this.dialog.open(AddPremisesDialogComponent, {
      height: '400px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((premise: Premise) => {
      if (premise) {
        if (this.buildingId) {
          premise.buildingId = Number(this.buildingId);
          this.premisesService.addPremise(premise).subscribe((response: Response) => {
            this.getBuilding();
          });
        }
      }
    });
  }

  editPremises(editPremises, event) {
    event.stopPropagation();
    if (!editPremises) {
      return;
    }
    const dialogRef = this.dialog.open(AddPremisesDialogComponent, {
      height: '400px',
      width: '350px',
      data: {
        premises: editPremises,
      }
    });

    dialogRef.afterClosed().subscribe((premise: Premise) => {
      if (premise) {
        this.premisesService.editPremise(premise).subscribe((response: Response) => {
          this.getBuilding();
        });
      }
    });
  }

  premisesDetails(row) {
    if (row) {
      const premisesId = row.id;
      this.router.navigate(['premises', premisesId]);
    }
  }
}
