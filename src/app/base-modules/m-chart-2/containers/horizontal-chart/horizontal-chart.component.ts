import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { EREPORT, ReportLabel } from '@shared/constants/report.constant';
import { MenuItem } from 'primeng/api';
import { saveAs } from 'file-saver'
import * as xlsx from 'xlsx'
import html2canvas from 'html2canvas';
import { ChartInfo } from '@shared/models/chart-info.model';
import { SpinnerService } from '@shared/services/spinner.service';
const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

@Component({
  selector: 'm-horizontalChart',
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.scss']
})
export class HorizontalChartComponent implements OnInit, OnChanges {
  @ViewChild('chartContent', { static: false }) chartContent!: any;
  @ViewChild('download') download!: ElementRef<HTMLElement>;
  @ViewChild('horizonTable') horizonTable!: ElementRef<HTMLElement>;

  @Input() params?: { [key: string]: any };
  @Input() isView = true;
  @Input() title?: string;
  @Input() reportCode?: EREPORT;
  @Input() value: { title: string, link?: string, data: ChartInfo }[] = [];
  @Input() legendLine = [true, true, true];
  @Input() label = '';
  @Input() status: { [key: string]: number } = {};
  @Output() dataView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() commentView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() onChangeStatus: EventEmitter<{ code: EREPORT, status: number }> = new EventEmitter()

  horizontalOptions = {
    indexAxis: 'y',
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  };

  items: MenuItem[] = [];

  tableData: ChartInfo = { labels: [], datasets: [] };

  constructor(private renderer: Renderer2, private spinnerService: SpinnerService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._getDataTable();
  }

  ngOnInit() {
    if (!this.title) {
      this.title = this.reportCode ? ReportLabel[this.reportCode] : '';
    }
    this._initMenu();
  }


  emptyData(data: any) {
    if (data.datasets?.length === 0 || (data?.datasets?.length > 0 && data?.datasets?.data?.length === 0)) {
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
    this.spinnerService.show();
    const el: HTMLElement = this.download.nativeElement;
    const content = this.chartContent.nativeElement;
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

  openLink({link}: any) {
    if(link) {
      let params = '';
      if (this.params) {
        Object.entries(this.params).forEach(([key, val]) => {
          if (val !== undefined && val !== null) {
            params += `${key}=${val}&`
          }
        })
      }
      window.open(link.includes('?') ? link + '&' + params : link + '?' + params, '_blank');
    }
  }


  private _getDataTable() {
    const index = this.value.findIndex(res => res.data.datasets && res.data.datasets.length > 1);
    if (index > -1) {
      this.tableData = this.value[index].data;
    } else if (this.value.length > 0) {
      this.tableData = this.value[0].data;
    }
  }

  private _initMenu() {
    if (this.isView) {
      this.items = [
        {
          label: 'Tải biểu đồ',
          icon: 'pi pi-download',
          command: () => {
            this.save();
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
    } else {
      this.items = [
        {
          label: 'Dữ liệu phân tích',
          icon: 'pi pi-database',
          command: () => {
            this.dataStatistic();
          }
        },
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
        },
        {
          label: 'Xem toàn màn hình',
          icon: 'pi pi-window-maximize',
          command: () => {
            this.toggleFullscreen();
          }
        }
      ]
    }
  }
}
