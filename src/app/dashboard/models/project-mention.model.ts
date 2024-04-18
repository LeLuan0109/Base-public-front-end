import { ChartInfo } from "@shared/models/chart-info.model";

export interface TopicMentionInfo {
  id?: number;
  name?: string;
  mentions?: number;
  interactives?: number;
  shares?: number;
  comments?: number;
  likes?: number;
  positive?: number;
  neutral?: number;
  negative?: number;
}

export class TopicMentionModel {
  data: { title: string, data: ChartInfo }[] = [];

  pipeLine(res: TopicMentionInfo[]) {
    const _labels: string[] = [];
    const _links: string[] = [];
    const _linksP: string[] = [];
    const _linksN: string[] = [];
    const _labelsP: string[] = [];
    const _labelsN: string[] = [];
    const _dataMention: number[] = [];
    const _dataPositive: number[] = [];
    const _dataNegative: number[] = [];

    res.filter(r => r.mentions! > 0).forEach(el => {
      _labels.push(el.name!);
      _links.push(`/posts?topicId=${el.id}&topicName=${el.name}`)
      _dataMention.push(el.mentions!);
    });

    [...res].filter(r => r.positive! > 0).sort((l, r) => r.positive! - l.positive!).forEach((el: any) => {
      _labelsP.push(el.name);
      _linksP.push(`/posts?topicId=${el.id}&topicName=${el.name}`)
      _dataPositive.push(el.positive);
    });

    [...res].filter(r => r.negative! > 0).sort((l, r) => r.negative! - l.negative!).forEach((el: any) => {
      _labelsN.push(el.name);
      _linksN.push(`/posts?topicId=${el.id}&topicName=${el.name}`)
      _dataNegative.push(el.negative);
    });

    this.data = [
      {
        title: 'Tất cả',
        data: {
          labels: _labels,
          links: _links,
          datasets: [
            {
              label: 'Tin bài',
              data: _dataMention,
              backgroundColor: '#3366cc',
              hoverBackgroundColor: '#3366cc',
            }
          ]
        }
      }, {
        title: 'Tiêu cực',
        data: {
          labels: _labelsN,
          links: _linksN.map(r => r + '&topicSentiment=2'),
          datasets: [
            {
              label: 'Tin bài',
              data: _dataNegative,
              backgroundColor: '#3366cc',
              hoverBackgroundColor: '#3366cc',
            }
          ]
        }
      }, {
        title: 'Tích cực',
        data: {
          labels: _labelsP,
          links: _linksP.map(r => r + '&topicSentiment=1'),
          datasets: [
            {
              label: 'Tin bài',
              data: _dataPositive,
              backgroundColor: '#3366cc',
              hoverBackgroundColor: '#3366cc',
            }
          ]
        }
      }
    ];
  }
}