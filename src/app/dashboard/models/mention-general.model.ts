import { MReportFilterModel } from "@based/m-report-toolbar/models/m-report-toolbar.model";

export interface MentionGeneralModel {
  data: MentionGeneralDataModel[];
  dataOld: MentionGeneralDataModel[];
  timeLabel: string;
}

export interface MentionGeneralDataModel {
  icon?: string;
  label?: string;
  value?: number;
  styleClass?: string;
}

export class MentionSourceModel {
  data?: { website: MentionGeneralModel, social: MentionGeneralModel };
  oldStartDate = 0;
  oldEndDate = 0;
  timeLineLabel = '';

  handingFilter(filter: MReportFilterModel) {
    const timeLine = Math.floor((filter.endDate! * 1000 - filter.startDate! * 1000) / (24 * 3600 * 1000));
    const now = new Date();
    const endDate = new Date(filter.endDate! * 1000);
    if (timeLine == 0 && endDate.getDate() === now.getDate() && endDate.getMonth() === now.getMonth()) {
      this.timeLineLabel = 'hôm qua';
    } else if (timeLine == 0) {
      this.timeLineLabel = 'ngày hôm trước';
    } else {
      this.timeLineLabel = timeLine + ' ngày trước';
    }
    const startOldDate = new Date(filter.startDate! * 1000);
    const endOldDate = new Date(filter.startDate! * 1000);
    endOldDate.setDate(endOldDate.getDate() - 1);
    startOldDate.setDate(startOldDate.getDate() - timeLine - 1);
    this.oldStartDate = Math.trunc(startOldDate.getTime() / 1000);
    this.oldEndDate = Math.trunc(endOldDate.getTime() / 1000);
  }

  pipelineData(current: any, old: any) {
    const social: MentionGeneralModel = {
      timeLabel: this.timeLineLabel, data: [{
        icon: 'pi pi-facebook',
        value: current.facebook,
        label: 'Facebook',
        styleClass: 'facebook'
      }, {
        icon: 'bi bi-tiktok',
        value: current.tiktok,
        label: 'Tiktok',
        styleClass: 'tiktok'
      }, {
        icon: 'pi pi-youtube',
        value: current.youtube,
        label: 'YouTube',
        styleClass: 'youtube'
      }],
      dataOld: [
        {
          value: old.facebook
        }, {
          value: old.tiktok
        }, {
          value: old.youtube
        }
      ]
    };

    const website: MentionGeneralModel = {
      timeLabel: this.timeLineLabel,
      data: [{
        label: 'Báo điện tử',
        icon: 'bi bi-newspaper',
        styleClass: 'news',
        value: current.official + current.localNews + current.journal + current.synthesis
      }, {
        label: 'Diễn đàn',
        icon: 'bi bi-menu-up',
        styleClass: 'forum',
        value: current.forum
      }, {
        label: 'Khác',
        icon: 'bi bi-globe',
        styleClass: 'other',
        value: current.blog + current.otherWeb
      }],
      dataOld: [
        {
          value: old.official + old.localNews + old.journal + old.synthesis
        }, {
          value: old.forum
        }, {
          value: old.blog + old.otherWeb
        }
      ],
    }
    this.data = { website, social };
  }
}