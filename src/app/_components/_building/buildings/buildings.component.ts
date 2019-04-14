import {Component, OnInit, ViewChild} from '@angular/core';
import {HousingCooperativeService} from '../../../_services/housingCooperative.service';
import {Router} from '@angular/router';
import {Building} from '../../../_models/building';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  buildings: Building[];
  displayedColumns: string[] = ['id', 'number', 'address', 'city'];
  displayedColumns2 = [
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
              private router: Router) { }

  ngOnInit() {
    this.getBuildings();
    console.log(this.displayedColumns2[0].key);
    console.log(this.displayedColumns2[0]['key']);
    // this.dataSource.paginator = this.paginator;
  }
  getBuildings() {
    this.housingCooperativeService.getBuildings().subscribe((buildings: Building[]) => {
      this.buildings = buildings;
      this.dataSource = new MatTableDataSource<Building>(this.buildings);
      console.log(this.buildings);
    });
  }
}
