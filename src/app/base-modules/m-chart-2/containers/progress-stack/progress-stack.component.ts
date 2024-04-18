import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MReportFilterModel } from '@based/m-report-toolbar/models/m-report-toolbar.model';
import { DecimalPipe } from '@angular/common';

export interface ProgressStackValue {
  color?: string,
  ratio?: number,
  label?: string
}

export interface ProgressSentValue {
  value: ProgressStackValue | ProgressStackValue[],
  type: 'all' | 'single',
  label: string
}

@Component({
  selector: 'm-progress-stack',
  templateUrl: './progress-stack.component.html',
  styleUrls: ['./progress-stack.component.scss'],
})
export class ProgressStackComponent {
  @Input() styleClass = '';
  @Input() isCollapse?: boolean = false;
  @Input() value?: ProgressStackValue[] | [];
  @Input() total?: number;
  @Input() ratioMax?: number;
  @Input() totalLabel?: string;
  @Input() showValue = true;
  @Input() label?: string;
  @Input() valueType: 'ratio' | 'valueType' = 'ratio';
  @Input() params?: MReportFilterModel;
  @Input() pgCollapse: boolean = false;
  @Input() showPercent: boolean = true;

  @Output() onClick: EventEmitter<ProgressSentValue> = new EventEmitter();
  @Output() pgCollapseChange: EventEmitter<boolean> = new EventEmitter();

  decimalPipe = new DecimalPipe('en-US');

  constructor() { }

  ngOnInit(): void { }

  getRatio(item: ProgressStackValue): number {
    if (this.valueType === 'ratio') {
      return item.ratio ?? 0;
    }
    return (item.ratio ?? 0) / Math.max(1, this.total ?? 1);
  }

  viewHtml() {
    let result = `<div class = "custom-toolip-content"><span class = "label-tootlip">${this.label}</span>`;
    result += `<div class = "pl-1 pb-1" ><span class ="total-lable">${this.decimalPipe.transform(this.total, '1.0-2')}</span> thảo luận</div>`
    if (this.value) {
      this.value.forEach((item: any) => {
        result += `<div class = "item-label"><i class="bi bi-square-fill icon-item pr-1" style="color: ${item.color};"> </i>  ${item.label}</div>`;
        result += `<div class = "percent-item pl-28 pb-1"><span class ="total-lable"> ${this.getRatio(item).toFixed(2)}% </span>(${this.decimalPipe.transform(item.totalItem, '1.0-0')} thảo luận )</div>  `
      });
    }
    result += '</div>';
    return result;
  }


  onProgress(item: ProgressStackValue | ProgressStackValue[], type: 'all' | 'single', event: any) {
    event.stopPropagation();
    this.onClick.emit({ value: item, type, label: this.label! });
  }

  onCollapse() {
    this.pgCollapse = !this.pgCollapse;
    this.pgCollapseChange.emit(this.pgCollapse);
  }
}
