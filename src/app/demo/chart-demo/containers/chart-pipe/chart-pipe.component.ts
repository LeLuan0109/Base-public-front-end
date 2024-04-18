import { Component, OnInit } from '@angular/core';
import { ChartInfo } from '@shared/models/chart-info.model';
import { NumberViewPipe } from '@shared/pipes/number-view.pipe';

@Component({
  selector: 'app-chart-pipe',
  templateUrl: './chart-pipe.component.html',
  styleUrls: ['./chart-pipe.component.scss']
})
export class ChartPipeComponent implements OnInit {
  legendPie = [true, true, true];
  pipeOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            var numberView = new NumberViewPipe();
            return ` ${context.label}: ${numberView.transform(context.parsed)}`;
          }
        }
      }
    }
  };
  pipeData: ChartInfo = {
    labels: ['Tích cực', 'Tiêu cực', 'Phản động'],
    datasets: [
      {
        data: [],
      },
    ],
  };
  percentage: number[] = [0, 0, 0];
  legendColors = ['#45deb0', '#c5c21f', '#d32f2f'];

  constructor() { }

  ngOnInit(): void {
      const positive = Math.random();
      const negative = Math.random();
      const reactive = Math.random();
      this.pipeData.datasets![0].data = [positive, negative, reactive];
      this.pipeData.datasets![0].backgroundColor = this.legendColors;
      const total = this.pipeData.datasets![0].data.reduce((r1, r2) => r1 + r2);
      this.percentage = this.pipeData.datasets![0].data.map(r => Math.round((r / Math.max(total, 1)) * 1000) / 10);
  }


  legendClickCallback(sChart: any, index: number) {
    this.legendPie[index] = !this.legendPie[index];
    const item = sChart.chart.getDatasetMeta(0).data[index];
    if (item.hidden) {
      item.hidden = false;
    } else {
      item.hidden = true;
    }
    sChart.chart.update();
    const total = sChart.chart.getDatasetMeta(0).total === 0 ? 1 : sChart.chart.getDatasetMeta(0).total;
    this.percentage = [...sChart.chart.getDatasetMeta(0)._parsed].map((r) => Math.round((r / total) * 10000) / 100);
  }

}
