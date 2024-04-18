import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartInfo, DatasetsChartInfo } from '@shared/models/chart-info.model';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent implements OnInit {
  barOptions: any = {};
  barData: ChartInfo = { labels: [], datasets: [] };
  legendLine = [true, true, true];

  constructor() { }

  ngAfterContentChecked(): void {
  }

  ngOnInit(): void {
    this.barOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x:
        {
          stacked: true,
        },
        y:
        {
          stacked: true,
        },
      },
    };
    this.generateData();
  }

  legendClickCallback(nacChart: any, index: number) {
    this.legendLine[index] = !this.legendLine[index];
    if (nacChart.chart.getDatasetMeta(index).hidden) {
      nacChart.chart.getDatasetMeta(index).hidden = false;
    } else {
      nacChart.chart.getDatasetMeta(index).hidden = true;
    }
    nacChart.chart.update();
  }

  generateData() {
    const society: DatasetsChartInfo = {
      label: 'Mạng xã hội',
      fill: false,
      borderColor: 'rgb(42, 109, 200)',
      backgroundColor: 'rgb(42, 109, 200)',
      tension: 0.4,
      total: 0,
      borderWidth: 0,
      barThickness: 20,
      data: [],
    };
    const news: DatasetsChartInfo = {
      label: 'Báo chí, tin tức',
      fill: false,
      borderColor: 'rgb(220, 123, 53)',
      backgroundColor: 'rgb(220, 123, 53)',
      tension: 0.4,
      total: 0,
      borderWidth: 0,
      barThickness: 20,
      data: [],
    };
    const other: DatasetsChartInfo = {
      label: 'Nguồn khác (diễn đàn, blog & website)',
      fill: false,
      borderColor: 'rgb(146, 170, 0)',
      backgroundColor: 'rgb(146, 170, 0)',
      tension: 0.4,
      total: 0,
      borderWidth: 0,
      barThickness: 20,
      data: [],
    };

    for(let i=0; i < 10; i++){
      this.barData.labels!.push(`Lable ${i + 1}`);
      society.data!.push(Math.random());
      news.data!.push(Math.random());
      other.data!.push(Math.random());
    }

    this.barData.datasets = [society, news, other];
  }

}
