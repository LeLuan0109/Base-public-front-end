import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MLayzyMultiSelectService } from "@based/m-lazy-multi-select/service/m-lazy-multi-select.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'm-lazyDropdown',
  templateUrl: './m-lazy-dropdown.component.html',
  styleUrls: ['./m-lazy-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MLazyDropdownComponent),
      multi: true
    }
  ]
})
export class MLazyDropdownComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() placeholder?: string;
  @Input() options: any;
  @Input() size = 10;
  @Input() first = 0;
  @Input() dataKey: string = 'value';
  @Input() dataLabel: string = 'label';
  @Input() disabled = false;
  @Input() valueInitLabel?: string;
  @Input() styleClass?: string;
  @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild('dropdown', { static: true }) dropdown?: ElementRef;

  private onChange?: (val: any) => void;
  private onTouch?: () => void;
  private _optionsLength = 0;
  private _isClearFilter = true;
  private _i = 0;

  valueSelected: any;
  isDisabled: boolean = false;
  filter = '';
  id = 'm-virtual-scroll-' + Math.random().toString(36).slice(-8);

  constructor(private mLayzyMultiSelectService: MLayzyMultiSelectService) { }

  ngOnInit(): void {
    // this.onLayzyLoadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._i = 0;
    const virtualScroll = document.getElementById(this.id)?.querySelector('cdk-virtual-scroll-viewport');
    if (virtualScroll && this.mLayzyMultiSelectService.getVirtualScroll.scrollTop < virtualScroll.scrollHeight) {
      virtualScroll?.scrollTo(0, this.mLayzyMultiSelectService.getVirtualScroll.scrollTop);
    }
    this.valueSelected = this.valueInitLabel ? { [`${this.dataKey}`]: undefined, [`${this.dataLabel}`]: this.valueInitLabel } : undefined;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.valueSelected = { [`${this.dataKey}`]: obj, [`${this.dataLabel}`]: this.valueInitLabel ?? obj };
      this.dropdown?.nativeElement.parentElement?.classList.add(
        'p-inputwrapper-filled'
      );
    } else {
      this.valueSelected = this.valueInitLabel ? { [`${this.dataKey}`]: undefined, [`${this.dataLabel}`]: this.valueInitLabel } : undefined;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onRowSelect(event: any) {
    if (this.onChange) {
      this.onChange(event.data[this.dataKey]);
    }
    if (this.onTouch) {
      this.onTouch();
    }
    this.dropdown?.nativeElement?.parentElement?.classList?.add(
      'p-inputwrapper-filled'
    );
    this.onSelect.emit(event);
  }

  onRowUnselect(event: any) {
    this.valueSelected = event.data;
    if (this.onChange) {
      this.onChange(event.data[this.dataKey]);
    }
    if (this.onTouch) {
      this.onTouch();
    }
    this.dropdown?.nativeElement.parentElement?.classList.add(
      'p-inputwrapper-filled'
    );
  }

  onLayzyLoadData(event?: any) {
    event.filter = event.filter.trim();
    this.onLazyLoad.emit(event);
    this._isClearFilter = false;
  }

  onShow(opDropdown: any, event: any) {
    if (this.onTouch) {
      this.onTouch();
    }
    if (this.isDisabled || this.disabled) {
      return;
    }
    opDropdown.toggle(event);
    if (!this.filter && this._optionsLength === 0) {
      this.onLayzyLoadData({ filter: '' });
    }
  }

  onHide() {
    if (this._optionsLength != this.options.length && this._isClearFilter) {
      this.filter = '';
    }
    this._optionsLength = this.options.length;
    this._isClearFilter = true;
  }

  labeling() {
    let _label = this.placeholder
    if (this.valueSelected) {
      let s = _label = this.valueSelected[this.dataLabel] ?? this.valueSelected[this.dataKey]
      let lb = s.split(' ')
      _label = lb[0] + lb[1]
    }

    return _label
  }

  @HostListener('document:wheel', ['$event.target'])
  onScoll(event: any) {
    if (event.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.id === this.id) {
      const element = document.getElementById(this.id)?.querySelector('cdk-virtual-scroll-viewport');
      if (element && (element.clientHeight + element.scrollTop) >= element.scrollHeight && this._i < 1
        && this.mLayzyMultiSelectService.getVirtualScroll.scrollHeight !== element.scrollHeight) {
        this.mLayzyMultiSelectService.setVirtualScroll = { scrollTop: element.scrollTop, scrollHeight: element.scrollHeight };
        this.onLayzyLoadData({ filter: this.filter ?? '', ...this.mLayzyMultiSelectService.getVirtualScroll });
        this._i++;
      }
    }
  }

  public clearData() {
    if (this.onChange) {
      this.onChange(undefined);
    }
    this.valueSelected = undefined;
    this.dropdown?.nativeElement.parentElement?.classList.remove('p-inputwrapper-filled');
    this.onSelect.emit({});
  }
}
