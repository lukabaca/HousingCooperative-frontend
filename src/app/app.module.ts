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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SideNavComponent,
    TopNavComponent,
    BuildingsComponent
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
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
