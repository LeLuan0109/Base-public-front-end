export interface ChartInfo {
  labels?: string[];
  links?: string[];
  datasets?: DatasetsChartInfo[];
}

export interface DatasetsChartInfo {
  serie?: string;
  icon?: string;
  label?: string;
  data?: number[];
  backgroundColor?: string[] | string;
  hoverBackgroundColor?: string[] | string;
  fill?: boolean;
  borderColor?: string;
  type?: string;
  yAxisID?: string;
  tension?: number;
  borderWidth?: number;
  barThickness?: number;
  total?: number;
}


export interface ICompartData {
  title: string
  absoluteData: number
  rateData: number
  icon: string
  color: string
  svg: string | undefined
}