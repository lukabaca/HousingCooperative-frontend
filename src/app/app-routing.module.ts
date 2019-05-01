import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './_components/login/login.component';
import {HomeComponent} from './_components/home/home.component';
import {AuthGuard} from './_guards/auth.guard';
import {BuildingsComponent} from './_components/_building/buildings/buildings.component';
import {LocatorsComponent} from "./_components/_locators/locators/locators.component";
import {BuildingComponent} from "./_components/_building/building/building.component";
import {LocatorComponent} from './_components/_locators/locator/locator.component';
import {AccessForbiddenComponent} from './_components/common/_errors/access-forbidden/access-forbidden.component';
import {PremisesDetailsComponent} from './_components/_premises/premises-details/premises-details.component';
import {MeasurementsComponent} from './_components/_measurements/measurements/measurements.component';
import {MeasurementsDetailsComponent} from './_components/_measurements/measurements-details/measurements-details.component';
import {BillsComponent} from './_components/_bills/bills/bills.component';
import {BillDetailsComponent} from './_components/_bills/bill-details/bill-details.component';
import {UserMeasurementsComponent} from './_components/_measurements/user-measurements/user-measurements.component';

const Roles = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
  MANAGER: 'ROLE_MANAGER'
};

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'home', component: BuildingsComponent, canActivate: [AuthGuard]},
  {path: 'buildings', component: BuildingsComponent, canActivate: [AuthGuard], data: { roles: [Roles.ADMIN] } },
  {path: 'building/:id', component: BuildingComponent, canActivate: [AuthGuard]},
  {path: 'locators', component: LocatorsComponent, canActivate: [AuthGuard], data: { roles: [Roles.ADMIN] }},
  {path: 'locator/:id', component: LocatorComponent, canActivate: [AuthGuard], data: { roles: [Roles.ADMIN] }},
  {path: 'locator', component: LocatorComponent, canActivate: [AuthGuard]},
  {path: 'accessForbidden', component: AccessForbiddenComponent, canActivate: [AuthGuard]},
  {path: 'premises/:id', component: PremisesDetailsComponent, canActivate: [AuthGuard]},
  {path: 'measurements', component: MeasurementsComponent, canActivate: [AuthGuard]},
  {path: 'userMeasurements', component: UserMeasurementsComponent, canActivate: [AuthGuard]},
  {path: 'measurements/:id', component: MeasurementsDetailsComponent, canActivate: [AuthGuard]},
  {path: 'bills', component: BillsComponent, canActivate: [AuthGuard]},
  {path: 'bills/:id', component: BillDetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
