import { DatePipe } from "@angular/common";
import { SeriesOptionsType, color } from "highcharts";
import { any } from "src/app/reports/models/metion-report.model"

export class MentionModel {
  website: { title: string, data?: SeriesOptionsType[] }[] = [
    { title: 'Tất cả' },
    { title: 'Báo chính thống' },
    { title: 'Trang tin tức' },
    { title: 'Diễn đàn' },
    { title: 'Khác' },
    { title: 'So sánh' }
  ];
  social: { title: string, data?: SeriesOptionsType[] }[] = [{ title: 'Tất cả' }, { title: 'Facebook' }, { title: 'Tiktok' }, { title: 'YouTube' }, {
    title: 'So sánh'
  }];

  private _colorWeb = ['#0099c6', '#109618', '#990099', '#66AA00', '#DD4477']
  private _colorSocial = ['#3B3EAC', '#3366CC', '#DC3912', '#FF9900']

  toLineData(items: any[], startDate: number, endDate: number) {
    const _dPipe = new DatePipe('en-US');
    const _dataWeb: { data: { name: string | null, y: number }[] }[] = Array.from({ length: 9 }, () => ({ data: [] }));
    const _dataSocial: { data: { name: string | null, y: number }[] }[] = Array.from({ length: 8 }, () => ({ data: [] }));
    const _diff = Math.floor((endDate - startDate) / (24 * 3600));

    items.forEach((el: { [key: string]: any }) => {
      this._setData(_dataSocial, _dataWeb, _diff === 0 ? el['reportTime'] : _dPipe.transform(el['reportTime'], 'dd/MM/yyyy'), el as any);
    })

    for (let i = 0; i < 5; i++) {
      this.website[i].data = [this._createDataset('column', this._colorWeb[i], _dataWeb[i].data)];
    }
    this.website[5].data = [
      this._createDataset('line', '#109618', _dataWeb[5].data, 'Báo chính thống'),
      this._createDataset('line', '#990099', _dataWeb[6].data, 'Trang tin tức'),
      this._createDataset('line', '#66AA00', _dataWeb[7].data, 'Diễn đàn'),
      this._createDataset('line', '#DD4477', _dataWeb[8].data, 'Khác')];
    for (let i = 0; i < 4; i++) {
      this.social[i].data = [this._createDataset('column', this._colorSocial[i], _dataSocial[i].data)];
    }
    this.social[4].data = [
      this._createDataset('line', '#3366CC', _dataSocial[4].data, 'Facebook'),
      this._createDataset('line', '#DC3912', _dataSocial[5].data, 'Tiktok'),
      this._createDataset('line', '#FF9900', _dataSocial[6].data, 'YouTube'),
    ]
  }

  private _createDataset(type: 'column' | 'line', color: string, data: any, name = ''): SeriesOptionsType {
    return {
      data: data,
      name: name,
      type: type,
      color: color,
      // marker: {
      //   symbol: 'circle',
      //   fillColor: '#FFFFFF',
      //   lineWidth: 2,
      //   lineColor: null
      // }
    }
  }

  private _setData(dataSocial: { data: { name: string | null, y: number }[] }[], dataWeb: { data: { name: string | null, y: number }[] }[], date: string, mention: any) {
    dataWeb[0].data.push({ name: date, y: mention.blog + mention.forum + mention.journal + mention.localNews + mention.official + mention.otherWeb + mention.synthesis });
    dataWeb[1].data.push({ name: date, y: mention.official });
    dataWeb[2].data.push({ name: date, y: mention.localNews + mention.journal + mention.synthesis });
    dataWeb[3].data.push({ name: date, y: mention.forum });
    dataWeb[4].data.push({ name: date, y: mention.blog + mention.otherWeb });

    dataWeb[5].data.push({ name: date, y: mention.official });
    dataWeb[6].data.push({ name: date, y: mention.localNews + mention.journal + mention.synthesis });
    dataWeb[7].data.push({ name: date, y: mention.forum });
    dataWeb[8].data.push({ name: date, y: mention.blog + mention.otherWeb });

    dataSocial[0].data.push({ name: date, y: mention.facebook + mention.tiktok + mention.youtube });
    dataSocial[1].data.push({ name: date, y: mention.facebook });
    dataSocial[2].data.push({ name: date, y: mention.tiktok });
    dataSocial[3].data.push({ name: date, y: mention.youtube });
    dataSocial[4].data.push({ name: date, y: mention.facebook });
    dataSocial[5].data.push({ name: date, y: mention.tiktok });
    dataSocial[6].data.push({ name: date, y: mention.youtube });
  }
}