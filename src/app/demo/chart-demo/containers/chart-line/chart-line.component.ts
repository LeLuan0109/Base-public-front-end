import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartInfo, DatasetsChartInfo } from '@shared/models/chart-info.model';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit {
  lineOptions: any = {};
  lineChart: ChartInfo = { labels: [], datasets: [] };
  legendLine = [true, true, true];
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();

  constructor() { }

  ngOnInit(): void {
    this.startDate.setDate(this.startDate.getDate() - 7);
    this.lineOptions = {
      plugins: {
        legend: {
          display: false,
          align: 'start',
          position: 'right',
          labels: {
            fontColor: '#495057',
            boxWidth: 0,
            rotation: 30,
            padding: 30,
          },
        },
        tooltips: {
          intersect: false,
          mode: 'index',
        },
      }
    };
    this.generateData();
  }

  legendClickCallback(mtChart: any, index: number) {
    this.legendLine[index] = !this.legendLine[index];
    if (mtChart.chart.getDatasetMeta(index).hidden) {
      mtChart.chart.getDatasetMeta(index).hidden = false;
    } else {
      mtChart.chart.getDatasetMeta(index).hidden = true;
    }
    mtChart.chart.update();
  }

  generateData() {
    const society: DatasetsChartInfo = {
      label: 'Mạng xã hội',
      fill: false,
      borderColor: 'rgb(42, 109, 200)',
      backgroundColor: 'rgb(42, 109, 200)',
      tension: 0.4,
      data: [],
    };
    const news: DatasetsChartInfo = {
      label: 'Báo chí, tin tức',
      fill: false,
      borderColor: 'rgb(220, 123, 53)',
      backgroundColor: 'rgb(220, 123, 53)',
      tension: 0.4,
      data: [],
    };
    const other: DatasetsChartInfo = {
      label: 'Nguồn khác (diễn đàn, blog & website)',
      fill: false,
      borderColor: 'rgb(146, 170, 0)',
      backgroundColor: 'rgb(146, 170, 0)',
      tension: 0.4,
      data: [],
    };
    
    const from = this.startDate;
    const to = this.endDate;
    const timeline = Math.floor((from.getTime() - to.getTime()) / 60 / 60 / 24);
    if (timeline === 1) {
      to.setDate(to.getDate() - timeline);
      from.setDate(from.getDate() - timeline);
    } else if (timeline > 1) {
      from.setDate(from.getDate() - timeline + 1);
    }


    const datePipe = new DatePipe('en-US');
    let formatDateLabel = 'dd/MM/yyyy';
    if (timeline === 0 || timeline === 1) {
      formatDateLabel = 'HH:mm';
      from.setHours(0);
      from.setMinutes(0);
      to.setHours(23);
      to.setMinutes(0);
      to.setSeconds(0);
    }

    do {
      this.lineChart.labels!.push(datePipe.transform(from, formatDateLabel)!);

      society.data!.push(Math.random());
      news.data!.push(Math.random());
      other.data!.push(Math.random());


      if (timeline === 0 || timeline === 1) {
        from.setHours(from.getHours() + 1);
       
        society.data![society.data!.length - 1] += Math.random();
        news.data![news.data!.length - 1] = Math.random();
        other.data![other.data!.length - 1] = Math.random();
        
        from.setHours(from.getHours() + 1);
      } else {
        from.setDate(from.getDate() + 1);
      }

    } while (from <= to);

    this.lineChart.datasets = [society, news, other];
  }


}
