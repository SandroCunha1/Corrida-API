import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MenuModule } from '../menu/menu.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MenuModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
