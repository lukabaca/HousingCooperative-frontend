import { Component, OnInit } from '@angular/core';
import {MeasurementService} from '../../../_services/measurement.service';
import {Router} from '@angular/router';
import {DataTableConfigurator} from '../../../_helpers/dataTableConfigurator';
import {Measurement} from '../../../_models/measurement';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-user-measurements',
  templateUrl: './user-measurements.component.html',
  styleUrls: ['./user-measurements.component.scss']
})
export class UserMeasurementsComponent extends DataTableConfigurator implements OnInit {
  measurements: Measurement[];
  columnKeys: string[] = ['id', 'month', 'year', 'premise.number', 'accepted', 'checked'];
  isLoading: boolean;
  constructor(private measurementsService: MeasurementService,
              private router: Router) {
    super();
    this.isLoading = true;
  }

  ngOnInit() {
    this.getMeasurements();
  }

  getMeasurements() {
    this.measurementsService.getUserMeasurements().subscribe((measurements: Measurement[]) => {
      this.measurements = measurements;
      this.dataSource = new MatTableDataSource<Measurement>(this.measurements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  measurementsDetails(element, event) {
    if (!element) {
      return;
    }
    this.router.navigate(['measurements', element.id]);
  }

  addMeasurement() {

  }
}
