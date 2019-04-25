import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({ providedIn: 'root' })
export class SnackBarGenerator {
  private defaultDurationInSeconds = 3;
  constructor(private snackBar: MatSnackBar) {

  }

  openSnackBar(message, isSuccess = false) {
    const styleClass = isSuccess ? 'snack-bar-success' : 'snack-bar-error';
    this.snackBar.open(message, '', {
      duration: this.defaultDurationInSeconds * 1000,
      panelClass: [styleClass]
    });
  }
}
