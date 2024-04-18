import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { EREPORT, ReportLabel } from '@shared/constants/report.constant';
import { MenuItem } from 'primeng/api';
import { saveAs } from 'file-saver'
import * as xlsx from 'xlsx'
import { ChartInfo } from '@shared/models/chart-info.model';
import html2canvas from 'html2canvas';
import { SpinnerService } from '@shared/services/spinner.service';
import { Router } from '@angular/router';
const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

@Component({
  selector: 'm-horizontalTopChart',
  templateUrl: './horizontal-top-chart.component.html',
  styleUrls: ['./horizontal-top-chart.component.scss']
})
export class HorizontalTopChartComponent implements OnInit, OnChanges {

  @ViewChild('chartContent', { static: false }) chartContent!: any;
  @ViewChild('download') download!: ElementRef<HTMLElement>;
  @ViewChild('horizonTable') horizonTable!: ElementRef<HTMLElement>;

  @Input() params?: { [key: string]: any };
  @Input() isView = true;
  @Input() isTab = true;
  @Input() title?: string;
  @Input() reportCode?: EREPORT;
  @Input() value: { title: string, data: ChartInfo }[] = [];
  @Input() legendLine = [true, true, true];
  @Input() label = '';
  @Input() status: { [key: string]: number } = {};
  @Output() dataView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() commentView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() onChangeStatus: EventEmitter<{ code: EREPORT, status: number }> = new EventEmitter()


  items: MenuItem[] = [];

  // tableData: ChartInfo = { labels: [], datasets: [] };

  constructor(private renderer: Renderer2, private spinnerService: SpinnerService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this._getDataTable();
  }

  ngOnInit() {
    if (!this.title) {
      this.title = this.reportCode ? ReportLabel[this.reportCode] : '';
    }
    this._initMenu();
  }

  emptyData(data: ChartInfo) {
    if (!data?.datasets || data.datasets.length < 1
      || !data.labels || data.labels.length < 1
      || !data.datasets[0].data
      || data.datasets[0].data?.length < 1
      || data.datasets[0].data.filter(r => r === 0).length === data.labels.length) {
      return true
    }
    return false
  }

  dataStatistic() {
    this.dataView.emit(this.reportCode)
  }

  changeNoteReportStatus() {
    this.onChangeStatus.emit({ code: this.reportCode!, status: this.status[this.reportCode!] });
  }

  save() {
    const el: HTMLElement = this.download.nativeElement;
    const content = this.chartContent.nativeElement;
    if (this.isTab) {
      this.spinnerService.show();
      this.renderer.addClass(content, 'show-all');
      setTimeout(() => {
        html2canvas(content).then(canvas => {
          el.setAttribute('href', canvas.toDataURL('image/png'))
          el.setAttribute('download', this.title + '.png')
          el.click();
        })
        this.renderer.removeClass(content, 'show-all');
        this.spinnerService.hiden();
      }, 800);
    } else {
      html2canvas(content).then(canvas => {
        el.setAttribute('href', canvas.toDataURL('image/png'))
        el.setAttribute('download', this.title + '.png')
        el.click();
      })
    }
  }

  comment() {
    this.commentView.emit(this.reportCode)
  }

  exportExcel() {
    const el = this.horizonTable.nativeElement
    const worksheet = xlsx.utils.table_to_book(el, { sheet: 'Dữ liệu' })
    const excelBuffer: any = xlsx.write(worksheet, {
      bookType: "xlsx",
      type: "array"
    });
    this.saveAsExcelFile(excelBuffer, this.title!);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    saveAs(
      data,
      fileName + '.xlsx'
    );
  }

  toggleFullscreen() {
    const elem = this.chartContent.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  @HostListener('fullscreenchange', ['$event'])
  @HostListener('webkitfullscreenchange', ['$event'])
  @HostListener('mozfullscreenchange', ['$event'])
  @HostListener('MSFullscreenChange', ['$event'])
  screenChange(event: any) {
    const elem = this.chartContent.nativeElement;
    if (elem.classList.contains('view-full')) {
      this.renderer.removeClass(elem, 'view-full');
    } else {
      this.renderer.addClass(elem, 'view-full');
    }
  }

  totalData(data: number[]): number {
    const sum = data.reduce((p, c) => p + c, 0);
    return sum > 0 ? sum : 1;
  }

  openLink(data: ChartInfo, i: number) {
    if (data.links && data.links.length > i) {
      let params = '';
      if (this.params) {
        Object.entries(this.params).forEach(([key, val]) => {
          if (val !== undefined && val !== null) {
            params += `${key}=${val}&`
          }
        })
      }
      const url = data.links[i];
      window.open(url.includes('?') ? url + '&' + params : url + '?' + params, '_blank');
    }
  }

  // private _getDataTable() {
  //   const index = this.value.findIndex(res => res.data.datasets && res.data.datasets.length > 1);
  //   if (index > -1) {
  //     this.tableData = this.value[index].data;
  //   } else if (this.value.length > 0) {
  //     this.tableData = this.value[0].data;
  //   }
  // }

  private _initMenu() {
    if (this.isView) {
      this.items = [
        {
          label: 'Tải biểu đồ',
          icon: 'pi pi-download',
          command: () => {
            this.save();
          }
        }, {
          label: 'Xem toàn màn hình',
          icon: 'pi pi-window-maximize',
          command: () => {
            this.toggleFullscreen();
          }
        },
      ]
    } else {
      this.items = [
        {
          label: 'Dữ liệu phân tích',
          icon: 'pi pi-database',
          command: () => {
            this.dataStatistic();
          }
        },
        // {
        //   label: (this.status[this.reportCode!] === undefined || this.status[this.reportCode!] === 1) ? 'Tắt ghi chú' : 'Bật ghi chú',
        //   icon: (this.status[this.reportCode!] === undefined || this.status[this.reportCode!] === 1) ? 'bi bi-journal-x' : 'bi bi-journal-check',
        //   command: () => {
        //     this.changeNoteReportStatus();
        //   }
        // },
        // {
        //   label: 'Ghi chú',
        //   icon: 'bi bi-pencil-square',
        //   command: () => {
        //     this.comment();
        //   },
        //   visible: this.status[this.reportCode!] === undefined || this.status[this.reportCode!] === 1
        // },
        {
          label: 'Tải biểu đồ',
          icon: 'pi pi-download',
          command: () => {
            this.save();
          }
        },
        {
          label: 'Tải dữ liệu Excel',
          icon: 'pi pi-file-excel',
          command: () => {
            this.exportExcel();
          }
        }, {
          label: 'Xem toàn màn hình',
          icon: 'pi pi-window-maximize',
          command: () => {
            this.toggleFullscreen();
          }
        },
      ]
    }
  }
}
