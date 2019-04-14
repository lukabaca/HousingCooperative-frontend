import {Component, OnInit, ViewChild} from '@angular/core';
import {HousingCooperativeService} from '../../../_services/housingCooperative.service';
import {Router} from '@angular/router';
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
  columnKeys: string[] = ['id', 'number', 'address', 'city'];
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
  ];
  constructor(private housingCooperativeService: HousingCooperativeService,
              private router: Router,
              private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.getBuildings();
  }
  getBuildings() {
    this.housingCooperativeService.getBuildings().subscribe((buildings: Building[]) => {
      this.buildings = buildings;
      this.dataSource = new MatTableDataSource<Building>(this.buildings);
      this.dataSource.paginator = this.paginator;
    });
  }
  editBuilding(editBuilding) {
   if (!editBuilding) {
     return;
   }
   const dialogRef = this.dialog.open(AddBuildingDialogComponent, {
     height: '450px',
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
