import { DatePipe } from "@angular/common";
import { ChartInfo, DatasetsChartInfo } from "@shared/models/chart-info.model";
import { SeriesOptionsType } from "highcharts";

export interface SentimentInfo {
  reportTime?: string;
  positiveSocial?: number;
  negativeSocial?: number;
  neutralSocial?: number;
  positiveOther?: number;
  negativeOther?: number;
  neutralOther?: number;
  topicId?: number;
  topicName?: string;
}

export class SentimentByTagModel {
  tag?: string;
  total?: number;
  collapse?: boolean;
  value?: {
    color?: string,
    ratio?: number,
    label?: string,
    totalItem?: number,
  }[];
  items?: SentimentByTagModel[];
}

export class SentimentByTagInfo {
  tag1?: string;
  tag2?: string;
  tag3?: string;
  positiveSocial?: number;
  negativeSocial?: number;
  neutralSocial?: number;
  positiveOther?: number;
  negativeOther?: number;
  neutralOther?: number;
}

export class SentimentModel {
  data?: { agg: ChartInfo, sta: { title: string, data: SeriesOptionsType[] }[] };


  private _label: { [key: string]: string } = {
    positive: 'Tích cực',
    neutral: 'Trung lập',
    negative: 'Tiêu cực',

  };

  private _icon: { [key: string]: string } = {
    positive: 'bi bi-emoji-smile-fill',
    negative: 'bi bi-emoji-frown-fill',
    neutral: 'bi bi-emoji-neutral-fill'
  }

  private _value: { [key: string]: number } = {
    positive: 1,
    negative: 2,
    neutral: 0
  }

  pipeLine(agg: SentimentInfo, sta: SentimentInfo[], startDate: number, endDate: number) {
    const aggChart: ChartInfo = { labels: [], datasets: [], links: [] };
    Object.entries(this._label).forEach(([key, val]) => {
      aggChart.labels?.push(val);
      aggChart.links?.push(`/posts?sentiments=${this._value[key]}`);
      aggChart.datasets?.push(this._getDatasetAgg(agg, key))
    })

    const _dPipe = new DatePipe('en-US');
    const _dataSentiment: { data: { name: string | null, y: number }[] }[] = Array.from({ length: 7 }, () => ({ data: [] }));
    const _diff = Math.floor((endDate - startDate) / (24 * 3600))

    sta.forEach((el: { [key: string]: any }) => {
      this._setData(_dataSentiment, _diff === 0 ? el['reportTime'] : _dPipe.transform(el['reportTime'], 'dd/MM/yyyy'), el);
    });

    this.data = {
      agg: aggChart, sta: [
        { title: 'Tổng quan',
         data: [this._createDataset('spline', '#26BF94', _dataSentiment[0].data, this._label['positive']),
          this._createDataset('spline', '#827696', _dataSentiment[3].data, this._label['neutral']),
          this._createDataset('spline', '#FF6F5B', _dataSentiment[1].data, this._label['negative']),] },

      ]
    };
  }

  private _getDatasetAgg(agg: SentimentInfo, serie: string): DatasetsChartInfo {
    return {
      serie,
      icon: this._icon[serie],
      label: this._label[serie],
      data: [Object.entries(agg)
        .filter(([key]) => key.includes(serie))
        .map(([, val]) => val)
        .reduce((p, c) => p + c, 0)]
    }
  }

  private _createDataset(type: 'column' | 'line' | 'spline', color: string, data: any, name = ''): SeriesOptionsType {
    return {
      data: data,
      name: name,
      type: type,
      color: color
    }
  }



  private _setData(dataSentiment: { data: { name: string | null, y: number }[] }[], date: string, sentiment: { [key: string]: number }) {
    dataSentiment[0].data.push({ name: this._getDatMonth(date), y: sentiment['positiveSocial'] + sentiment['positiveOther'] })
    dataSentiment[1].data.push({ name: this._getDatMonth(date), y: sentiment['negativeSocial'] + sentiment['negativeOther'] })
    dataSentiment[3].data.push({ name: this._getDatMonth(date), y: sentiment['neutralSocial'] + sentiment['neutralOther'] })
  }
  private _getDatMonth(date: string) {
    return date.split('/').slice(0, 2).join('/');
  }
}