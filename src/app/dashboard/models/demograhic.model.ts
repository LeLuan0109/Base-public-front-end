import { ChartInfo } from "@shared/models/chart-info.model";

export interface GenderInfo {
  males?: number;
  females?: number;
  othersGender?: number;
}

export interface AgeInfo {
  age1824?: number;
  age2534?: number;
  age3544?: number;
  age4554?: number;
  age5564?: number;
  age65?: number;
  ageOther?: number;
  ageMales1824?: number;
  ageFemales1824?: number;
  ageOther1824?: number;
  ageMales2534?: number;
  ageFemales2534?: number;
  ageOther2534?: number;
  ageMales3544?: number;
  ageFemales3544?: number;
  ageOther3544?: number;
  ageMales4554?: number;
  ageFemales4554?: number;
  ageOther4554?: number;
  ageMales5564?: number;
  ageFemales5564?: number;
  ageOther5564?: number;
  ageMales65?: number;
  ageFemales65?: number;
  ageOther65?: number;
}


export class DemographicModel {
  data: { title: string, data: ChartInfo }[] = [];

  private _seriesGenderColors: { [key: string]: string } = {
    males: '#3366CC',
    females: 'rgb(250, 176, 5)',
    othersGender: 'rgb(121, 80, 242)',
  }

  private _seriesGenderLabels: { [key: string]: string } = {
    males: 'Nam',
    females: 'Nữ',
    othersGender: 'Khác',
  }

  private _seriesAgeColors: { [key: string]: string } = {
    age1824: '#3366cc',
    age2534: '#dc3912',
    age3544: '#ff9900',
    age4554: '#109618',
    age5564: '#990099',
    age65: '#0099c6',
    ageOther: '#dd4477',
  }

  private _seriesAgeLabels: { [key: string]: string } = {
    age1824: 'Từ 18-24 tuổi',
    age2534: 'Từ 25-34 tuổi',
    age3544: 'Từ 35-44 tuổi',
    age4554: 'Từ 45-54 tuổi',
    age5564: 'Từ 55-64 tuổi',
    age65: 'Trên 65 tuổi',
    ageOther: 'Khác',
  }

  pipeLine(gender: GenderInfo, age: AgeInfo) {
    this.data = [
      { title: 'Giới tính', data: this._convertPipeChart(gender, this._seriesGenderLabels, this._seriesGenderColors) },
      { title: 'Độ tuổi', data: this._convertPipeChart(age, this._seriesAgeLabels, this._seriesAgeColors) },
    ];
  }

  private _convertPipeChart(data: GenderInfo | AgeInfo, labels: any, colors: any) {
    const dataChart: any = {
      labels: [],
      datasets: [{
        label: 'Số lượng',
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      }]
    };
    Object.entries(data).forEach(([key, val]) => {
      if (labels[key]) {
        dataChart.labels.push(labels[key]);
        dataChart.datasets[0].data?.push(val);
        dataChart.datasets[0].backgroundColor.push(colors[key]);
        dataChart.datasets[0].hoverBackgroundColor.push(colors[key]);
      }
    });
    return dataChart;
  }
}