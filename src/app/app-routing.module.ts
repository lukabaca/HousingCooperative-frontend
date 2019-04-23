import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './_components/login/login.component';
import {HomeComponent} from './_components/home/home.component';
import {AuthGuard} from './_guards/auth.guard';
import {BuildingsComponent} from './_components/_building/buildings/buildings.component';
import {LocatorsComponent} from "./_components/_locators/locators/locators.component";
import {BuildingComponent} from "./_components/_building/building/building.component";
import {LocatorComponent} from './_components/_locators/locator/locator.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'home', component: BuildingsComponent, canActivate: [AuthGuard]},
  {path: 'buildings', component: BuildingsComponent, canActivate: [AuthGuard]},
  {path: 'building/:id', component: BuildingComponent, canActivate: [AuthGuard]},
  {path: 'locators', component: LocatorsComponent, canActivate: [AuthGuard]},
  {path: 'locator/:id', component: LocatorComponent, canActivate: [AuthGuard]},
  {path: 'locator', component: LocatorComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
