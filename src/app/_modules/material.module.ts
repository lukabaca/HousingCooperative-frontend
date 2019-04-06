import {NgModule} from '@angular/core';
import {MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class MaterialModule {}
