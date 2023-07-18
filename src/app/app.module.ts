import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { MenuModule } from './modules/menu/menu.module';
import { UserModule } from './modules/user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { CountryModule } from './modules/country/country.module';
import { SpeedWayModule } from './modules/speed-way/speed-way.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    MenuModule,
    UserModule,
    CountryModule,
    SpeedWayModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
