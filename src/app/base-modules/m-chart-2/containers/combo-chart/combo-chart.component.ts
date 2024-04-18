import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { EREPORT, ReportLabel } from '@shared/constants/report.constant';
import { MenuItem } from 'primeng/api';
import * as xlsx from 'xlsx'
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { SpinnerService } from '@shared/services/spinner.service';
import Highcharts, { SeriesOptionsType } from 'highcharts';
import { _VIEW_REPEATER_STRATEGY } from '@angular/cdk/collections';

@Component({
  selector: 'm-comboChart',
  templateUrl: './combo-chart.component.html',
  styleUrls: ['./combo-chart.component.scss']
})
export class ComboChartComponent implements OnInit, OnChanges {
  @ViewChild('chartContent', { static: true }) chartContent!: any;
  @ViewChild('download') download!: ElementRef<HTMLElement>;
  @ViewChild('comboTable') comboTable!: ElementRef<HTMLElement>;

  @ContentChild('comboTop', { static: true }) topRef: TemplateRef<any> | undefined;
  @ContentChild('comboBottom', { static: true }) bottomRef: TemplateRef<any> | undefined;

  @Input() params?: { [key: string]: any };
  @Input() isView = true;
  @Input() title?: string;
  @Input() reportCode?: EREPORT;
  @Input() value: { title: string, link?: string, data: SeriesOptionsType[] }[] = [];
  @Input() status: { [key: string]: number } = {};

  @Output() dataView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() commentView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() onChangeStatus: EventEmitter<{ code: EREPORT, status: number }> = new EventEmitter()

  metionChartUpdate = false;

  Highcharts: typeof Highcharts = Highcharts;

  options: Highcharts.Options = {
    title: {
      text: ''
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: 'linear',
      tickAmount: 5,
      title: {
        text: 'Số lượng'
      },
    },
    plotOptions: {
      series: {
        lineWidth: 2,
        states: {
          hover: {
            enabled: true,
            lineWidth: 3
          },
        },
        marker: {
          radius: 1,
        }
      }
    },
    tooltip: {
      formatter: function () {
        var s = '<div style="border: 1px solid red"><b>' + this.point.name + '</b>';
        if (this.points && this.points.length > 1) {
          // const _total = this.points?.reduce((a, v: any) => { return a + Math.abs(v.series.data[this.point.index].y as number) }, 0);
          this.points?.forEach((item) => {
            const _value = item.series.data[this.point.index].y as number;
            // const _ratio = _value === 0 ? 0 : (_value == _total ? 100 : (Math.abs(_value) / Math.max(_total!, 1) * 100).toFixed(2));
            s += `<br/><br/> 
            <div style="color: ${item.series.data[this.point.index].color};">
            ${item.series.name}
            ${_value}
            </div>`
          });
          return s + '</div>';
        }
        return s + `<br/><br/><div>Số bài viết <b>${this.point.y}</b></div></div>`
      },
      shared: true
    }
  };
  optionsAll: Highcharts.Options[] = [];

  items: MenuItem[] = []

  constructor(private renderer: Renderer2, private spinnerService: SpinnerService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.optionsAll = [];
    this.value.forEach((el, inddex) => {
      this.optionsAll.push(this.getOptions(el.data, el.data.length));
    })
    this.metionChartUpdate = true;
  }

  ngOnInit() {
    if (!this.title) {
      this.title = this.reportCode ? ReportLabel[this.reportCode] : '';
    }
    this._initMenu();
  }

  emptyData(data: SeriesOptionsType[]) {
    if (!data || data.length < 1 || data.filter((r: any) => !r.data || r.data.langth < 1).length === data.length) {
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
    const content = this.chartContent.nativeElement
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

  getOptions(data: SeriesOptionsType[], leng?: number): Highcharts.Options {
    const op: Highcharts.Options = { ...this.options };
    op.legend = { enabled: (leng && leng > 1) ? true : false };
    op.series = data;
    return op;
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
