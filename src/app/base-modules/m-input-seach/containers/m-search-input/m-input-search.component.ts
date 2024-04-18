import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'm-inputSearch',
  templateUrl: './m-input-search.component.html',
  styleUrls: ['./m-input-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MInputSearchComponent),
      multi: true
    }
  ]
})
export class MInputSearchComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() styleClass?: string;
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  private onChange?: (val: any) => void;
  private onTouch?: () => void;
  isDisabled = false;

  keyword?: string;

  constructor() { }

  ngOnInit(): void {
    this.isDisabled = this.disabled;
  }

  writeValue(obj: string): void {
    if (obj) {
      this.keyword = obj
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

  onFocus() {
    if (this.onTouch) {
      this.onTouch();
    }
  }

  search() {
    if (this.onChange) {
      this.onChange(this.keyword);
    }
    this.onSearch.emit(this.keyword);
  }

  clear() {
    if (this.isDisabled) {
      return;
    }
    this.keyword = undefined;
    if (this.onChange) {
      this.onChange(this.keyword);
    }
    this.onSearch.emit(this.keyword);
  }
}
