import {
  ApexAxisChartSeries,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
} from 'ng-apexcharts';

export type ChartOptions = Partial<{
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  xaxis: ApexXAxis;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  labels: string[];
  responsive: ApexResponsive[];
  stroke: ApexStroke;
}>;
