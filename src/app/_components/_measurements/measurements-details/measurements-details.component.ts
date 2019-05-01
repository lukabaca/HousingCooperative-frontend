import { Component, OnInit } from '@angular/core';
import {MeasurementService} from '../../../_services/measurement.service';
import {Measurement} from '../../../_models/measurement';
import {ActivatedRoute} from '@angular/router';
import {StateAcceptedRequest} from '../../../_models/_requests/stateAcceptedRequest';
import {SnackBarGenerator} from '../../../_helpers/snackBarGenerator';

@Component({
  selector: 'app-measurements-details',
  templateUrl: './measurements-details.component.html',
  styleUrls: ['./measurements-details.component.scss']
})
export class MeasurementsDetailsComponent implements OnInit {

  measurementId: string;
  measurement: Measurement;
  constructor(private measurementsService: MeasurementService,
              private route: ActivatedRoute,
              private snackBar: SnackBarGenerator) {
    if (this.route.snapshot.params.id) {
      this.measurementId = this.route.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.getMeasurement();
  }

  getMeasurement() {
    this.measurementsService.getMeasurement(this.measurementId).subscribe((measurement: Measurement) => {
      if (measurement) {
        this.measurement = measurement;
      }
    });
  }

  acceptMeasurement() {
    let measurementStatus = new StateAcceptedRequest();
    measurementStatus.accepted = true;
    this.measurementsService.changeMeasurementStatus(this.measurement.id, measurementStatus).subscribe(res => {
      this.snackBar.openSnackBar('Zaakceptowano odczyt', true);
      this.getMeasurement();
    });
  }

  denyMeasurement() {
    let measurementStatus = new StateAcceptedRequest();
    measurementStatus.accepted = false;
    this.measurementsService.changeMeasurementStatus(this.measurement.id, measurementStatus).subscribe(res => {
      this.snackBar.openSnackBar('Odrzucono odczyt', true);
      this.getMeasurement();
    });
  }
}
