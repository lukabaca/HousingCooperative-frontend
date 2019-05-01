import { Component, OnInit } from '@angular/core';
import {MeasurementService} from '../../../_services/measurement.service';
import {Building} from '../../../_models/building';
import {Measurement} from '../../../_models/measurement';
import {DataTableConfigurator} from '../../../_helpers/dataTableConfigurator';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent extends DataTableConfigurator implements OnInit {
  measurements: Measurement[];
  columnKeys: string[] = ['id', 'month', 'year'];
  isLoading: boolean;
  displayedColumns = [
    {
      "key": "id",
      "name": "id"
    },
    {
      "key": "month",
      "name": "numer"
    },
    {
      "key": "year",
      "name": "adres"
    },
  ];
  constructor(private measurementsService: MeasurementService) {
    super();
    this.isLoading = true;
  }

  ngOnInit() {
    this.getMeasurements();
  }

  getMeasurements() {
    this.measurementsService.getMeasurements().subscribe((measurements: Measurement[]) => {
      this.measurements = measurements;
      this.dataSource = new MatTableDataSource<Measurement>(this.measurements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }
}
