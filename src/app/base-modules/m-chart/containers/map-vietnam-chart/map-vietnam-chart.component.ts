import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import * as topology from '../../../../../assets/vendor/highcharts/vn-all.json';
import { EREPORT, ReportLabel } from '@shared/constants/report.constant';
import { MenuItem } from 'primeng/api';
import { saveAs } from 'file-saver'
import * as xlsx from 'xlsx'
import html2canvas from 'html2canvas';

declare let Highcharts: any;

@Component({
  selector: 'map-vietnam-chart',
  templateUrl: './map-vietnam-chart.component.html',
  styleUrls: ['./map-vietnam-chart.component.scss']
})
export class MapVietnamChartComponent implements OnInit, OnChanges {
  @ViewChild('chartContent', { static: false }) chartContent: any;
  @ViewChild('download') download!: ElementRef<HTMLElement>;
  @ViewChild('mapTable') mapTable!: ElementRef<HTMLElement>;

  @Input() isChartonly = false;
  @Input() isContent = false;
  @Input() title?: string;
  @Input() reportCode?: EREPORT;
  @Input() data: any[] = [];
  @Input() dataLabel = 'name';
  @Input() dataValue = 'profiles';
  @Input() status: { [key: string]: number } = {};
  @Output() dataView = new EventEmitter<EREPORT>()
  @Output() commentView = new EventEmitter<EREPORT>();
  @Output() onChangeStatus: EventEmitter<{ code: EREPORT, status: number }> = new EventEmitter()

  dataMap: any[] = [];
  hChartMap: any;
  dataTable: any;

  items: MenuItem[] = []
  id = 'map-chart-' + Math.random().toString(36).slice(-8)

  constructor(private renderer: Renderer2) { }

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

  ngOnChanges(changes: SimpleChanges): void {
    this.getData()
    if (this.dataTable && this.dataTable.length > 0) {
      this.mapData();
      setTimeout(() => {
        this.initChart();
      }, 100);
    }
  }

  initChart() {
    this.hChartMap = Highcharts.mapChart(this.id, {
      chart: {
        map: topology
      },

      title: {
        text: '',
      },

      subtitle: {
        text: ''
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },

      colorAxis: {
        min: 0
      },

      series: [{
        data: this.dataMap,
        name: 'Đối tượng',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }],

      navigation: {
        buttonOptions: {
          enabled: false
        }
      },

      exporting: {
        filename: this.title
      }

    });
  }

  mapData() {
    const dataMaps = topology;
    const geo = dataMaps.objects.default.geometries.filter(r => r.properties['type-en'] === 'Province' && r.properties && r.properties.name);
    this.dataMap = geo.map(r => {
      const result: any[] = [r.properties['hc-key']];
      const index = this.data?.findIndex(d => (d[this.dataLabel]?.toLocaleLowerCase() === r.properties.name?.toLocaleLowerCase()
        || d[this.dataLabel]?.toLocaleLowerCase() === r.properties['alt-name']?.toLocaleLowerCase())
        || this.toSlug(d[this.dataLabel]).includes(this.toSlug(r.properties.name!))) ?? -1
      result.push(index > -1 ? this.data![index][this.dataValue] : 0);
      return result;
    })
  }

  getData() {
    if (this.data.length < 1) {
      this.dataTable = [];
    } else {
      const dataMaps = topology;
      const geo = dataMaps.objects.default.geometries.filter(r => r.properties['type-en'] === 'Province' && r.properties && r.properties.name);
      this.dataTable = this.data.filter(r => geo.findIndex(g => this.toSlug(r[this.dataLabel]).includes(this.toSlug(g.properties.name!))) > -1)
    }
  }

  comment() {
    this.commentView.emit(this.reportCode)
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

    // this.hChartMap.exportChart({
    //   type: 'image/png'
    // })
    // const el: HTMLElement = this.download.nativeElement;
    // this.chartContent.nativeElement.querySelectorAll('canvas')?.forEach((item: any) => {
    //   el.setAttribute('href', item.toDataURL())
    //   el.setAttribute('download', this.title + '.png')
    //   el.click();
    // })
  }

  changeNoteReportStatus() {
    this.onChangeStatus.emit({ code: this.reportCode!, status: this.status[this.reportCode!] });
  }

  exportExcel() {

    const worksheet = xlsx.utils.json_to_sheet(this.data)
    const workbook = xlsx.utils.book_new();
    xlsx.utils.sheet_add_aoa(worksheet, [["Tỉnh thành", "Số lượng hồ sơ"]], { origin: "A1" });
    xlsx.utils.book_append_sheet(workbook, worksheet, "Dữ liệu");
    const excelBuffer: any = xlsx.write(workbook, {
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

  toSlug(input: string) {
    // Chuyển hết sang chữ thường
    let str = input.toLowerCase();
    // xóa dấu
    str = str
      .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
      .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

    // Thay ký tự đĐ
    str = str.replace(/[ðđĐ]/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // Xóa ký tự - liên tiếp
    str = str.replace(/-+/g, '-');

    // xóa phần dư - ở đầu & cuối
    str = str.replace(/^-+|-+$/g, '');

    // return
    return str;
  }
}
