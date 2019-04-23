import {Component, OnInit, ViewChild} from '@angular/core';
import {HousingCooperativeService} from '../../../_services/housingCooperative.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Building} from '../../../_models/building';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {AddBuildingDialogComponent} from '../../_dialogs/add-building-dialog/add-building-dialog.component';
import {DataTableConfigurator} from '../../../_helpers/dataTableConfigurator';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent extends DataTableConfigurator implements OnInit {
  buildings: Building[];
  columnKeys: string[] = ['id', 'number', 'address', 'city', 'edit'];
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
      "key": "address",
      "name": "adres"
    },
    {
      "key": "city",
      "name": "miasto"
    },
    {
      "key": "edit",
      "name": "Akcja"
    },
  ];
  constructor(private housingCooperativeService: HousingCooperativeService,
              private router: Router,
              private dialog: MatDialog,) {
    super();
    this.isLoading = true;
  }

  ngOnInit() {
    this.getBuildings();
  }
  getBuildings() {
    this.housingCooperativeService.getBuildings().subscribe((buildings: Building[]) => {
      this.buildings = buildings;
      this.dataSource = new MatTableDataSource<Building>(this.buildings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }
  editBuilding(editBuilding, event) {
    event.stopPropagation();
    if (!editBuilding) {
      return;
    }
    const dialogRef = this.dialog.open(AddBuildingDialogComponent, {
      height: '400px',
      width: '350px',
      data: {
        building: editBuilding,
      }
    });

    dialogRef.afterClosed().subscribe((building: Building) => {
      console.log(building);
      if (building) {
        console.log(building);
        this.housingCooperativeService.editBuilding(building).subscribe(res => {
          if (res) {
            this.getBuildings();
          }
        });
      }
    });
  }

  buildingDetails(editBuilding) {
    if (!editBuilding) {
      return;
    }
    this.router.navigate(['building', editBuilding.id]);
  }

  addBuilding() {
    const dialogRef = this.dialog.open(AddBuildingDialogComponent, {
      height: '450px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((building: Building) => {
      if (building) {
        console.log(building);
        this.housingCooperativeService.addBuilding(building).subscribe(res => {
          if (res) {
            this.getBuildings();
          }
        });
      }
    });
  }
}
