import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from "@angular/core";
import { SpinnerService } from "@shared/services/spinner.service";
import { saveAs } from 'file-saver';
import { MenuItem } from "primeng/api";
import html2canvas from 'html2canvas';
import * as xlsx from 'xlsx'
import { LabelValueObj } from "@shared/models/label-value.model";


@Component({
  selector: 'm-dataView',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss']
})
export class DataViewComponent implements OnInit {
  @ViewChild('chartContent', { static: false }) chartContent!: any;
  @ViewChild('download') download!: ElementRef<HTMLElement>;
  @ViewChild('dataTable') dataTable!: ElementRef<HTMLElement>;

  @Input() title?: string;
  @Input() value: { link?: string, data?: LabelValueObj[] }[] = [];
  @Input() labelLink = '';

  items: MenuItem[] = []

  constructor(private renderer: Renderer2, private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this._initMenu();
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

  exportExcel() {
    const el = this.dataTable.nativeElement
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

  emptyData(): boolean {
    return !this.value || this.value.length < 1 || !this.value[0].data || this.value[0].data.length < 1;
  }

  private _initMenu() {
    this.items = [
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