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
  {path: 'locators', component: LocatorsComponent, canActivate: [AuthGuard]},
  {path: 'locator/:id', component: LocatorComponent, canActivate: [AuthGuard]},
  {path: 'locator', component: LocatorComponent, canActivate: [AuthGuard]},
  {path: 'accessForbidden', component: AccessForbiddenComponent, canActivate: [AuthGuard]},
  {path: 'premises/:id', component: PremisesDetailsComponent, canActivate: [AuthGuard]},
  {path: 'measurements', component: MeasurementsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
