import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { EREPORT, ReportLabel } from '@shared/constants/report.constant';
import { MenuItem } from 'primeng/api';
import * as xlsx from 'xlsx'
import { saveAs } from 'file-saver';
import { ChartInfo } from '@shared/models/chart-info.model';
import html2canvas from 'html2canvas';
import { NumberViewPipe } from '@shared/pipes/number-view.pipe';
import { SpinnerService } from '@shared/services/spinner.service';
const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

@Component({
  selector: 'm-donutChart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit, OnChanges {
  @ViewChild('chartContent', { static: false }) chartContent!: any;
  @ViewChild('download') download!: ElementRef<HTMLElement>;
  @ViewChild('comboTable') comboTable!: ElementRef<HTMLElement>;

  @ContentChild('donutTop', { static: true }) topRef: TemplateRef<any> | undefined;
  @ContentChild('donutBottom', { static: true }) bottomRef: TemplateRef<any> | undefined;

  @Input() params?: { [key: string]: any };
  @Input() isView = true;
  @Input() title?: string;
  @Input() reportCode?: EREPORT;
  @Input() value: { title: string, link?: string, data: ChartInfo }[] = [];
  @Input() status: { [key: string]: number } = {};

  @Output() dataView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() commentView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() onChangeStatus: EventEmitter<{ code: EREPORT, status: number }> = new EventEmitter()

  tableData: ChartInfo = { labels: [], datasets: [] };

  options = {
    background: 'red',
    plugins: {

      legend: {
        display: true,
        position: 'right'
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            var numberView = new NumberViewPipe(); // console.log('===> So pie: ', context)
            // let _rate = context.parsed / context.datasets?.data.reduce((a: number, b: number) => a + b, 0) * 100
            return ` ${context.label}:  ${numberView.transform(context.parsed)}`;
          }
        }
      },
      datalabels: {
        /* show value in percents */
        formatter: (value: number, ctx: any) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data: number) => {
            sum += data;
          });
          const percentage = (value * 100 / sum);
          return percentage !== 0 ? percentage.toFixed(2) + '%' : '';
        },
        color: '#fff',
      }
    }
  };

  items: MenuItem[] = []

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

  emptyData(data: ChartInfo) {
    if (!data?.datasets || data.datasets.length < 1
      || !data.labels || data.labels.length < 1
      || !data.datasets[0].data
      || data.datasets[0].data?.length < 1
      || data.datasets[0].data.filter(r => r === 0).length === data.datasets[0].data?.length) {
      return true
    }
    return false
  }

  dataStatistic() {
    this.dataView.emit(this.reportCode)
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

  changeNoteReportStatus() {
    this.onChangeStatus.emit({ code: this.reportCode!, status: this.status[this.reportCode!] });
  }

  exportExcel() {
    const el = this.comboTable.nativeElement
    const worksheet = xlsx.utils.table_to_book(el, { sheet: 'Dữ liệu' });
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

  isDateFormat(d: string) {
    if (!d) {
      return false
    }
    return d.length <= 6 ? false : true
  }

  openLink({ link }: any) {
    if (link) {
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
