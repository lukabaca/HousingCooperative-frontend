import { Component, OnInit } from '@angular/core';
import {Measurement} from '../../../_models/measurement';
import {MeasurementService} from '../../../_services/measurement.service';
import {User} from '../../../_models/user';
import {UserInfo} from '../../../_models/userInfo';
import {Role} from '../../../_models/role';
import {ActivatedRoute} from '@angular/router';
import {SnackBarGenerator} from '../../../_helpers/snackBarGenerator';
import {AuthenticationService} from '../../../_services/authentication.service';
import {Premise} from '../../../_models/premise';
import {PremisesService} from '../../../_services/premises.service';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss']
})
export class AddMeasurementComponent implements OnInit {
  measurement: Measurement;
  isEditingMeasurement: boolean;
  months: number[] = [];
  years: number[] = [];
  constructor(private measurementService: MeasurementService,
              private premisesService: PremisesService,
              private route: ActivatedRoute,
              private snackBar: SnackBarGenerator,
              private authenticationService: AuthenticationService) {
    this.initForm();
  }

  ngOnInit() {
    this.initMonths();
    this.initYears();
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
      this.authenticationService.getUserData().subscribe((userData: User) => {
        if (!userData) {
          return;
        }
        this.premisesService.getUserPremies().subscribe((premise: Premise) => {
          const userPremise = premise;
          this.measurement.premisesId = userPremise.id;
          this.measurementService.updateMeasurement(this.measurement).subscribe(res => {
            if (res) {
              this.snackBar.openSnackBar('Poprawnie zaktualizowano odczyt', true);
            }
          },  error => {
            this.snackBar.openSnackBar('Wystąpił błąd', false);
          });
        });
      });
    } else {
      this.premisesService.getUserPremies().subscribe((premise: Premise) => {
        const userPremise = premise;
        this.measurement.premisesId = userPremise.id;
        this.measurementService.createMeasurement(this.measurement).subscribe(res => {
          if (res) {
            this.snackBar.openSnackBar('Poprawnie dodano odczyt', true);
            measurementForm.resetForm();
          }
        }, error => {
          this.snackBar.openSnackBar('Wystąpił błąd', false);
        });
      });
    }
  }

  initMonths() {
    for (let i = 1; i <= 12 ; i++) {
      this.months.push(i);
    }
  }

  initYears() {
    const currentYear = new Date().getFullYear();
    const pastYear = currentYear - 1;
    this.years.push(currentYear);
    this.years.push(pastYear);
  }
}
