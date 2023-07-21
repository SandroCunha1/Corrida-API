import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { UserComponent } from './modules/user/components/user/user.component';
import { CountryComponent } from './modules/country/components/country/country.component';
import { SpeedWayComponent } from './modules/speed-way/components/speed-way/speed-way.component';
import { LoginComponent } from './modules/login/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'users', component: UserComponent},
  {path: 'country', component: CountryComponent},
  {path: 'speed-way', component: SpeedWayComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
