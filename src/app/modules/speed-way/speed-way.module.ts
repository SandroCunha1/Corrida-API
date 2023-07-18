import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedWayComponent } from './components/speed-way/speed-way.component';
import { SpeedWayFormComponent } from './components/speed-way-form/speed-way-form.component';
import { SpeedWayTableComponent } from './components/speed-way-table/speed-way-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SpeedWayComponent,
    SpeedWayFormComponent,
    SpeedWayTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SpeedWayComponent
  ]
})
export class SpeedWayModule { }
