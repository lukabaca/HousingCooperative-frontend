import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule, MatTableModule,
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
  ]
})
export class MaterialModule {}
