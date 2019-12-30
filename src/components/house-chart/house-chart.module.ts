import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HouseChartComponent} from './house-chart.component';
@NgModule({
  declarations: [HouseChartComponent],
  imports: [
    CommonModule
  ],
  exports:[HouseChartComponent]
})
export class HouseChartModule { }
