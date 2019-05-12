import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { ChartType } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-teui-chart',
  templateUrl: './teui-chart.component.html',
  styleUrls: ['./teui-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TEUIChartComponent implements OnInit, OnChanges {
  @Input() result: any;
  // Inner Doughnut
  public innerDoughnutChartLabels: Label[] = [];
  public innerDoughnutChartData: SingleDataSet = [];
  public innerDoughnutChartType: ChartType = 'doughnut';
  public innerChartColors: any[] = [
    {
      backgroundColor: []
    }
  ];
  // Outer Doughnut
  public outerDoughnutChartLabels: Label[] = [];
  public outerDoughnutChartData: SingleDataSet = [];
  public outerDoughnutChartType: ChartType = 'doughnut';
  public outerChartColors: any[] = [
    {
      backgroundColor: []
    }
  ];
  private options: any = {
    tooltips: { enabled: false }
  };
  showOuterChart = false;

  constructor() {}

  ngOnChanges() {
    if (this.result && this.result.chartData) {
      const { chartData, teui } = this.result;
      const { energy, renewableEnergy } = chartData;
      this.drawOuterDonutChart(renewableEnergy);
      this.drawInnerDonutChart(energy);
    }
  }
  ngOnInit() {}

  drawOuterDonutChart(renewableEnergy) {
    console.log(renewableEnergy);
    let sum = 0;
    for (const i in renewableEnergy) {
      if (renewableEnergy.hasOwnProperty(i)) {
        renewableEnergy[i] = Math.abs(renewableEnergy[i]);
      }
    }
    for (const i in renewableEnergy) {
      if (renewableEnergy[i]) {
        sum += renewableEnergy[i];
        // Display chart if there is any values
        if (renewableEnergy[i] > 0) {
          this.showOuterChart = true;
        }
      }
    }
    for (const i in renewableEnergy) {
      if (renewableEnergy[i]) {
        const percentage = ((renewableEnergy[i] / sum) * 100).toFixed(2);
        if (i === 'offSiteGreenNaturalGasKWhM2') {
          this.outerDoughnutChartLabels.push(
            `Offsite Green Natural Gas: ${Math.abs(
              renewableEnergy[i]
            )}kw (${percentage}%)`
          );
          this.outerChartColors[0].backgroundColor.push('#00BB30');
        }
        if (i === 'onSiteRenewableElecKWhM2') {
          this.outerDoughnutChartLabels.push(
            `Offsite Renewable Electricity: ${Math.abs(
              renewableEnergy[i]
            )}kw (${percentage}%)`
          );
          this.outerChartColors[0].backgroundColor.push('#00BB30');
        }
        if (i === 'offSiteRenewableElecKWhM2') {
          this.outerDoughnutChartLabels.push(
            `Offsite Renewable Electricity: ${Math.abs(
              renewableEnergy[i]
            )}kw (${percentage}%)`
          );
          this.outerChartColors[0].backgroundColor.push('#0000FF');
        }
        this.outerDoughnutChartData = [
          ...this.outerDoughnutChartData,
          renewableEnergy[i]
        ];
      }
    }
  }

  drawInnerDonutChart(energy) {
    let sum = 0;
    for (const i in energy) {
      if (energy[i]) {
        sum += energy[i];
      }
    }
    for (const i in energy) {
      if (energy[i]) {
        const percentage = ((energy[i] / sum) * 100).toFixed(2);
        if (i === 'electricityKWhM2') {
          this.innerDoughnutChartLabels.push(
            `Electricity: ${energy[i]}kw (${percentage}%)`
          );
          this.innerChartColors[0].backgroundColor.push('#5F9DFC');
        }
        if (i === 'gasKWhM2') {
          this.innerDoughnutChartLabels.push(
            `Gas: ${energy[i]}kw (${percentage}%)`
          );
          this.innerChartColors[0].backgroundColor.push('#FAD03A');
        }
        if (i === 'oilKWhM2') {
          this.innerDoughnutChartLabels.push(
            `Oil: ${energy[i]}kw (${percentage}%)`
          );
          this.innerChartColors[0].backgroundColor.push('#000000');
        }
        if (i === 'woodKWhM2') {
          this.innerDoughnutChartLabels.push(
            `Biofuel: ${energy[i]}kw (${percentage}%)`
          );
          this.innerChartColors[0].backgroundColor.push('#996532');
        }
        this.innerDoughnutChartData = [
          ...this.innerDoughnutChartData,
          energy[i]
        ];
      }
    }
  }
}
