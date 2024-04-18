import { SeriesOptionsType, TooltipFormatterCallbackFunction } from 'highcharts/highcharts.src';

export interface IChartOptionInput {
  title?: string;
  data?: SeriesOptionsType[];
  formatter?: TooltipFormatterCallbackFunction;
  xAxisLabels?: string[];
  yAxisLabels?: string[];
  objectLabel?: string;
  onPointClick?: (pointName: string) => void;
  onLegendItemClick?: (event: any) => void;
}
