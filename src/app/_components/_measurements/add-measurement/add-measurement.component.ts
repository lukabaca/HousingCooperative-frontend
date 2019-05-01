import { Component, OnInit } from '@angular/core';
import {Measurement} from '../../../_models/measurement';
import {MeasurementService} from '../../../_services/measurement.service';
import {User} from '../../../_models/user';
import {UserInfo} from '../../../_models/userInfo';
import {Role} from '../../../_models/role';
import {ActivatedRoute} from '@angular/router';
import {SnackBarGenerator} from '../../../_helpers/snackBarGenerator';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss']
})
export class AddMeasurementComponent implements OnInit {
  measurement: Measurement;
  isEditingMeasurement: boolean;

  constructor(private measurementService: MeasurementService,
              private route: ActivatedRoute,
              private snackBar: SnackBarGenerator) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    if (this.route.snapshot.params.id) {
      const measurementId = this.route.snapshot.params.id;
      this.measurementService.getMeasurement(measurementId).subscribe((measurement: Measurement) => {
        if (measurement) {
          this.measurement = measurement;
          this.isEditingMeasurement = true;
        }
      });
    } else {
      this.measurement = new Measurement();
      this.isEditingMeasurement = false;
    }
  }

  onSubmit(measurementForm) {
    if (this.isEditingMeasurement) {
      this.measurementService.updateMeasurement(this.measurement).subscribe(res => {
        if (res) {
          this.snackBar.openSnackBar('Poprawnie zaktualizowano odczyt', true);
        }
      },  error => {
        this.snackBar.openSnackBar('Wystąpił błąd', false);
      });
    } else {
      this.measurementService.createMeasurement(this.measurement).subscribe(res => {
        if (res) {
          this.snackBar.openSnackBar('Poprawnie dodano odczyt', true);
          measurementForm.resetForm();
        }
      }, error => {
        this.snackBar.openSnackBar('Wystąpił błąd', false);
      });
    }
  }
}
