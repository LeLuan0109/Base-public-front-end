import { ChartInfo } from "@shared/models/chart-info.model";
// import { IProfileInfo } from "src/app/reports/models/ranking-report.model";

export class TopProfileInteractModel {
  total?: number;
  profiles?: any[];
}
export class TopProfileModel {
  data?: { title: string, data: ChartInfo };

  pipeLine(res: any[]) {
    this.data = {
      title: 'Tất cả',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Tin bài',
            data: [],
            backgroundColor: '#3366cc',
            hoverBackgroundColor: '#3366cc',
          }
        ]
      }
    };
    res.forEach(el => {
      this.data?.data.labels?.push(el.name!);
      this.data?.data.datasets![0].data?.push(el.posts!);
    })
  }
}