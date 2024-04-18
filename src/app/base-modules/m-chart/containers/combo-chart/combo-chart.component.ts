import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { EREPORT, ReportLabel } from '@shared/constants/report.constant';
import { MenuItem } from 'primeng/api';
import * as xlsx from 'xlsx'
import { saveAs } from 'file-saver';
const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
import html2canvas from 'html2canvas';

@Component({
  selector: 'combo-chart',
  templateUrl: './combo-chart.component.html',
  styleUrls: ['./combo-chart.component.scss']
})
export class ComboChartComponent implements OnInit {
  @ViewChild('chartContent', { static: false }) chartContent!: any;
  @ViewChild('download') download!: ElementRef<HTMLElement>;
  @ViewChild('comboTable') comboTable!: ElementRef<HTMLElement>;

  @Input() isChartonly = false;
  @Input() isContent = false;
  @Input() title?: string;
  @Input() reportCode?: EREPORT;
  @Input() data: any;
  @Input() legendLine = [true, true, true];
  // @Input() tableData: any[] = [];
  @Input() status: { [key: string]: number } = {};
  @Output() dataView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() commentView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() onChangeStatus: EventEmitter<{ code: EREPORT, status: number }> = new EventEmitter()

  options = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    skipNull: true,
    plugins: {
      legend: {
        position: 'bottom',
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
        type: 'linear',
        display: true,
        position: 'left',
        numberTicks: 5,
        min:0,
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
          stepSize:1          
        },
        grid: {
          color: surfaceBorder
        }
      },
      y1: {
        type: 'linear',
        display: false,
        position: 'right',
        min:0,
        numberTicks: 5,
        beginAtZero: true,    
        ticks: {
          color: textColorSecondary,
          stepSize:1          
        },
        grid: {
          color: '#ee82ee50'
        }
      }
    }
  };

  items: MenuItem[] = []

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    if (!this.title) {
      this.title = this.reportCode ? ReportLabel[this.reportCode] : '';
    }
    this.data = { labels: [], datasets: [] };
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
    if (this.data.labels?.length < 1 || this.data?.datasets?.length < 1) {
      return true
    }
    return false
  }

  dataStatistic() {
    this.dataView.emit(this.reportCode)
  }

  save() {
    const el: HTMLElement = this.download.nativeElement;
    const content = this.chartContent.nativeElement
    html2canvas(content).then(canvas => {
      el.setAttribute('href', canvas.toDataURL('image/png'))
      el.setAttribute('download', this.title + '.png')
      el.click();
    })

    // const el: HTMLElement = this.download.nativeElement;
    // this.chartContent.nativeElement.querySelectorAll('canvas').forEach((item: any) => {
    //   el.setAttribute('href', item.toDataURL())
    //   el.setAttribute('download', this.title + '.png')
    //   el.click();
    // })
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
    }
    else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.exitFullscreen) {
      // console.log(4)
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
  
}
