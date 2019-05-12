import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-teui-bar-chart',
  templateUrl: './teui-bar-chart.component.html',
  styleUrls: ['./teui-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TEUIBarChartComponent implements OnInit, OnChanges {
  @Input() result: any;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartLabels: Label[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012'
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40] }
  ];

  constructor() {}

  ngOnChanges() {
    if (this.result && this.result.teui) {
      const { teui } = this.result;
    }
  }
  ngOnInit() {}
}
