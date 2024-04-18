import { EREPORT, ReportLabel } from './../../../../shared/constants/report.constant';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import saveAs from 'file-saver';
import * as xlsx from 'xlsx'
import { MenuItem } from 'primeng/api';
import { MDialogService } from '@based/m-dialog/services/m-dialog.service';
import { TableDetailComponent } from '../table-detail/table-detail.component';

@Component({
  selector: 'grid-report',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnInit {
  @ViewChild('lineChart') chart!: any
  @ViewChild('download') download!: ElementRef<HTMLElement>;
  @ViewChild('columnTable') columnTable!: ElementRef<HTMLElement>;
  @ViewChild('tableScreen') tableScreen!: ElementRef<HTMLElement>;
  @Input() checkbox?: boolean = false;
  @Input() title?: string;
  @Input() reportCode?: EREPORT
  @Input() data: any
  @Input() series: any[] = [];
  @Input() showHeader = true;
  @Input() status: { [key: string]: number } = {};
  @Output() dataView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() commentView: EventEmitter<EREPORT> = new EventEmitter()
  @Output() onChangeStatus: EventEmitter<{ code: EREPORT, status: number }> = new EventEmitter()
  @Output() onCheck: EventEmitter<any> = new EventEmitter()
  @Input()  selectedRecords: any[] = []

  items: MenuItem[] = []
  selectAll = false

  constructor(private renderer: Renderer2, private dialogService:MDialogService) { }

  ngOnInit(): void {
    if (!this.title) {
      this.title = this.reportCode ? ReportLabel[this.reportCode] : '';
    }
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
    ];
  }

  emptyData() {
    if (this.data?.length === 0) {
      return true
    }
    return false
  }

  dataStatistic() {
    this.dataView.emit(this.reportCode);
  }

  comment() {
    this.commentView.emit(this.reportCode);
  }

  changeNoteReportStatus() {
    this.onChangeStatus.emit({ code: this.reportCode!, status: this.status[this.reportCode!] });
  }

  exportExcel() {
    const el = this.columnTable.nativeElement
    const worksheet = xlsx.utils.table_to_book(el, { sheet: 'Dữ liệu', raw: true });
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

  isCentered(n: any, c: any) {
    const centerFields = ['socPSourceName', 'profileType', 'crawlSource', 'otherName', 'gender', 'socPSourceType']
    if (centerFields.includes(c)) {
      return true
    }
    return isNaN(n) || c === 'id' ? false : true
  }

  dataFormat(n: any, c: string) {
    if (isNaN(n) || c === 'id' || n === null) {
      return (n || n === '') ? n : '-'
    }

    return n?.toLocaleString('en-US', { minimumFractionDigits: 0 })
  }

  toggleFullscreen() {
    const elem = this.tableScreen.nativeElement as any;
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
    }
  }

  @HostListener('fullscreenchange', ['$event'])
  @HostListener('webkitfullscreenchange', ['$event'])
  @HostListener('mozfullscreenchange', ['$event'])
  @HostListener('MSFullscreenChange', ['$event'])

  screenChange(event: any) {
    const elem = this.tableScreen.nativeElement;
    if (elem.classList.contains('view-full')) {
      this.renderer.removeClass(elem, 'view-full');
    } else {
      this.renderer.addClass(elem, 'view-full');
    }
  }

  updateCheckbox(e: any, t?: number) {
    console.log('==> checked = ', e, '==>', this.selectedRecords)
    if (t) {
      this.selectAll ? this.selectedRecords = [] : {}
      this.onCheck.emit(this.selectAll)
    } else {
      this.onCheck.emit(this.selectedRecords)
    }

  }

  detailView(item:any, series:any) {
    this.showHeader? {}: this.dialogService.open(TableDetailComponent, {series: series, item: item})
  }

  hasOriginView(item:any) {
    // let domain =  new RegExp('[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+')
    let domain =  new RegExp(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g)
    if (item && item?.id)
    {
      const _check = domain.test(item?.id) 
      if(_check) {
        return true
      } else {
        return item?.crawlSource !== 'Website' &&  item?.crawlSource !== '-'?true:false 
      }
    } 

    return false
  }

  onOriginView(item:any) {
    // let domain =  new RegExp(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g)
    if(item && item?.id) {
      if(item?.id.startsWith('https://')) {
        window.open(item?.id, "_blank");
      } else {
        switch(item?.crawlSource) {
          case 'Website':
             window.open( `https://${item?.id}`, "_blank");
          break;
          case 'Facebook':
            window.open( `https://facebook.com/${item?.id}`, "_blank");
          break
          case 'Youtube':
            window.open( `https://youtube.com/channel/${item?.id}`, "_blank");
          break
          case 'Tiktok':
            window.open( `https://tiktok.com/@${item?.id}`, "_blank");
          break

          
        }
        
       
      }
    }
  }

}
