import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { EREPORT, ReportLabel } from '@shared/constants/report.constant';
import { saveAs } from 'file-saver';
import * as xlsx from 'xlsx'
import { MenuItem } from 'primeng/api';
import html2canvas from 'html2canvas';
import { DatasetsChartInfo } from '@shared/models/chart-info.model';

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

@Component({
  selector: 'stack-chart',
  templateUrl: './stack-chart.component.html',
  styleUrls: ['./stack-chart.component.scss']
})
export class StackChartComponent implements OnInit {
  @ViewChild('chartContent', { static: false }) chartContent: any;
  @ViewChild('download') download!: ElementRef<HTMLElement>;
  @ViewChild('stackTable') stackTable!: ElementRef<HTMLElement>;

  @Input() isChartonly = false;
  @Input() isContent = false;
  @Input() title?: string;
  @Input() reportCode?: EREPORT;
  @Input() data: any
  @Input() status: { [key: string]: number } = {};
  @Output() dataView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() commentView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() onChangeStatus: EventEmitter<{ code: EREPORT, status: number }> = new EventEmitter()

  options = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltips: {
        mode: 'index',
        intersect: false
      },
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      },
      y: {
        stacked: true,
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      }
    }
  };;

  items: MenuItem[] = []

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    if (!this.title) {
      this.title = this.reportCode ? ReportLabel[this.reportCode] : '';
    }
    this.data = { datasets: [], labels: [] };

    this.items = [

      // {
      //   label: 'Dữ liệu phân tích',
      //   icon: 'pi pi-database',
      //   command: () => {
      //     this.dataStatistic();
      //   }
      // },
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
      }, {
        label: 'Tải dữ liệu Excel',
        icon: 'pi pi-file-excel',
        command: () => {
          this.exportExcel();
        }
      },
      {
        label: 'Xem toàn màn hình',
        icon: 'pi pi-window-maximize',
        command: () => {
          this.toggleFullscreen();
        }
      },
    ]
  }

  emptyData() {
    if (this.data.labels?.length < 1 || this.data?.datasets?.length < 1 || this.data?.datasets.filter((r: DatasetsChartInfo) => r.data && r.data.length > 0).length < 1) {
      return true
    }
    return false
  }

  dataStatistic() {
    this.dataView.emit(this.reportCode)
  }

  comment() {
    this.commentView.emit(this.reportCode)
  }

  save() {
    const el: HTMLElement = this.download.nativeElement;
    const content = this.chartContent.nativeElement
    html2canvas(content).then(canvas => {
      el.setAttribute('href', canvas.toDataURL('image/png'))
      el.setAttribute('download', this.title + '.png')
      el.click();
    })
  }


  exportExcel() {
    const el = this.stackTable.nativeElement
    const worksheet = xlsx.utils.table_to_book(el, { sheet: 'Dữ liệu' })
    const excelBuffer: any = xlsx.write(worksheet, {
      bookType: "xlsx",
      type: "array"
    });
    this.saveAsExcelFile(excelBuffer, this.title!);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  changeNoteReportStatus() {
    this.onChangeStatus.emit({ code: this.reportCode!, status: this.status[this.reportCode!] });
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
}
