import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule, MatSnackBarModule, MatTableModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
