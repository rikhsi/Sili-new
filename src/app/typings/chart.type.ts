import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
} from 'ng-apexcharts';

export type ChartOptions = Partial<{
  series: ApexAxisChartSeries;
  xaxis: ApexXAxis;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
}>;
