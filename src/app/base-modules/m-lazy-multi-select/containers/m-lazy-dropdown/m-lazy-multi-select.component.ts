import { MLayzyMultiSelectService } from './../../service/m-lazy-multi-select.service';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'm-layzyMultiSelect',
  templateUrl: './m-lazy-multi-select.component.html',
  styleUrls: ['./m-lazy-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MLazyMultiSelectComponent),
      multi: true
    }
  ]
})
export class MLazyMultiSelectComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() placeholder?: string;
  @Input() showToggleAll = false;
  @Input() headerLabel?: string;
  @Input() options: any;
  @Input() size = 10;
  @Input() first = 0;
  @Input() dataKey: string = 'value';
  @Input() dataLabel: string = 'label';
  @Input() disabled = false;
  @Input() initLabel?: string;
  @Input() styleClass?: string;
  @Input() showEmtyMessage = true;
  @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild('dropdown', { static: true }) dropdown?: ElementRef;

  private onChange?: (val: any) => void;
  private onTouch?: () => void;
  private _optionsLength = 0;
  private _isClearFilter = true;
  private _i = 0;
  private _isObj = false;

  id = 'm-virtual-scroll-' + Math.random().toString(36).slice(-8);
  valueSelected: any;
  isDisabled: boolean = false;
  filter = '';

  constructor(private mLayzyMultiSelectService: MLayzyMultiSelectService) { }

  get value(): string {
    if (!this.valueSelected || this.valueSelected.length < 1) {
      return this.placeholder ?? '';
    }
    if (this.valueSelected.length === 1) {
      return this.valueSelected[0][this.dataLabel];
    }
    return `${this.valueSelected.length} mục được chọn`;
  }

  get dataTooltip(): string {
    if (this.valueSelected && this.valueSelected.length > 0) {
      return this.valueSelected.map((r: any) => r[this.dataLabel]).join(", ");
    }
    return '';
  }

  ngOnInit(): void {
    // this.onLayzyLoadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._i = 0;
    const virtualScroll = document.getElementById(this.id)?.querySelector('cdk-virtual-scroll-viewport');
    if (virtualScroll && this.mLayzyMultiSelectService.getVirtualScroll.scrollTop < virtualScroll.scrollHeight) {
      virtualScroll?.scrollTo(0, this.mLayzyMultiSelectService.getVirtualScroll.scrollTop);
    }
    if (this.options && this.options.length > 0 && !this.options[0][this.dataKey]) {
      this._isObj = true;
      if (new Set(this.options.map((r: any) => r['id'])).size === this.options.length) {
        this.dataKey = 'id';
      } else if (new Set(this.options.map((r: any) => r['code'])).size === this.options.length) {
        this.dataKey = 'code';
      } else {
        Object.keys(this.options[0]).forEach(key => {
          if (new Set(this.options.map((r: any) => r[key])).size === this.options.length) {
            this.dataKey = key;
            return;
          }
        })
      }
      this.valueSelected = this.valueSelected ? [...this.valueSelected] : [];
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' && typeof obj !== 'symbol') {
        this.valueSelected = [{ [`${this.dataKey}`]: obj, [`${this.dataLabel}`]: this.initLabel ?? obj }];
      } else {
        if (obj.length === undefined) {
          this.valueSelected = [obj];
          this._isObj = true;
        } else if (obj.length === 1) {
          this.valueSelected = obj?.map((r: any) => {
            if (typeof r === 'object') {
              this._isObj = true;
              return r;
            } else {
              this._isObj = false;
              return { [`${this.dataKey}`]: r, [`${this.dataLabel}`]: this.initLabel ?? r }
            }
          });
        } else if (obj.length > 1) {
          if (typeof obj[0] === 'object') {
            this._isObj = true;
            this.valueSelected = obj;
          } else {
            this._isObj = false;
            this.valueSelected = obj.map((r: any) => ({ [`${this.dataKey}`]: r, [`${this.dataLabel}`]: r }))
          }
        }
      }
      this.dropdown?.nativeElement.parentElement?.classList.add(
        'p-inputwrapper-filled'
      );
    } else {
      this.valueSelected = undefined;
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
      this.onChange(this._isObj ? this.valueSelected : this.valueSelected?.map((r: any) => r[`${this.dataKey}`]));
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
    if (this.onChange) {
      this.onChange(this._isObj ? this.valueSelected : this.valueSelected?.map((r: any) => r[`${this.dataKey}`]));
    }
    if (this.onTouch) {
      this.onTouch();
    }
    this.dropdown?.nativeElement.parentElement?.classList.add(
      'p-inputwrapper-filled'
    );
    this.onSelect.emit(event);
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

  public clearData() {
    if (this.onChange) {
      this.onChange([]);
    }
    this.valueSelected = [];
    this.dropdown?.nativeElement.parentElement?.classList.remove('p-inputwrapper-filled');
    this.onSelect.emit({});
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
        this.onLayzyLoadData({ filter: this.filter.trim() ?? '', ...this.mLayzyMultiSelectService.getVirtualScroll });
        this._i++;
      }
    }
  }
}
