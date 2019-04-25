import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './_modules/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationService} from './_services/authentication.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './_components/login/login.component';
import {JwtInterceptor} from './_interceptors/jwt.interceptor';
import {AuthErrorInterceptor} from './_interceptors/authError.interceptor';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './_components/home/home.component';
import { SideNavComponent } from './_components/common/side-nav/side-nav.component';
import { TopNavComponent } from './_components/common/top-nav/top-nav.component';
import { BuildingsComponent } from './_components/_building/buildings/buildings.component';
import {HousingCooperativeService} from './_services/housingCooperative.service';
import { AddBuildingDialogComponent } from './_components/_dialogs/add-building-dialog/add-building-dialog.component';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef} from '@angular/material';
import { LocatorsComponent } from './_components/_locators/locators/locators.component';
import { BuildingComponent } from './_components/_building/building/building.component';
import { AddPremisesDialogComponent } from './_components/_dialogs/add-premises-dialog/add-premises-dialog.component';
import {PremisesService} from './_services/premises.service';
import { LoadingComponent } from './_components/common/loading/loading.component';
import { LocatorComponent } from './_components/_locators/locator/locator.component';
import { SnackBarComponent } from './_components/common/snack-bar/snack-bar.component';
import {SnackBarGenerator} from './_helpers/snackBarGenerator';
import { AccessForbiddenComponent } from './_components/common/_errors/access-forbidden/access-forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SideNavComponent,
    TopNavComponent,
    BuildingsComponent,
    AddBuildingDialogComponent,
    LocatorsComponent,
    BuildingComponent,
    AddPremisesDialogComponent,
    LoadingComponent,
    LocatorComponent,
    SnackBarComponent,
    AccessForbiddenComponent,
  ],
  entryComponents: [
    AddBuildingDialogComponent,
    AddPremisesDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthenticationService,
    HousingCooperativeService,
    PremisesService,
    SnackBarGenerator,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
