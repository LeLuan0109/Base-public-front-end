import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EREPORT, ReportLabel } from '@shared/constants/report.constant';
import { MenuItem } from 'primeng/api';
import * as xlsx from 'xlsx'
import { saveAs } from 'file-saver';
import { ChartInfo } from '@shared/models/chart-info.model';
import html2canvas from 'html2canvas';
const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

@Component({
  selector: 'm-ratioLine',
  templateUrl: './ratio-line-chart.component.html',
  styleUrls: ['./ratio-line-chart.component.scss']
})
export class RatioLineChartComponent implements OnInit, OnChanges {

  @Input() params?: { [key: string]: any };
  @Input() styleClass = '';
  @Input() value: ChartInfo = { labels: [], links: [], datasets: [] };
  total = 1;
  isEmpty = true;

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    let _total = 0;
    this.value.datasets?.forEach(el => {
      _total += (el.data && el.data.length > 0 ? el.data[0] : 0);
    })
    if (_total > 0) {
      this.isEmpty = false;
      this.total = _total;
    }
  }

  openLink(i: number) {
    if (this.value.links && this.value.links.length > i) {
      let params = '';
      if (this.params) {
        Object.entries(this.params).forEach(([key, val]) => {
          if (val !== undefined && val !== null) {
            params += `${key}=${val}&`
          }
        })
      }
      const url = this.value.links[i];
      window.open(url.includes('?') ? url + '&' + params : url + '?' + params, '_blank');
    }
  }
}
