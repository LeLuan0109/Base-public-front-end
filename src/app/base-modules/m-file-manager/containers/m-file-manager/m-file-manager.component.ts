import { MFileManagerModalComponent } from '../m-file-manager-modal/m-file-manager-modal.component';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { FILE_TYPE } from 'src/app/shared/constants/upload-file.constant';
import { FileType } from '../../types/file-manager.type';
import { MFileMangaerViewComponent } from '../m-file-mangaer-view/m-file-mangaer-view.component';
@Component({
  selector: 'm-file-manager',
  templateUrl: './m-file-manager.component.html',
  styleUrls: ['./m-file-manager.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MFileManagerComponent),
      multi: true
    },
    DialogService,
  ]
})
export class MFileManagerComponent implements ControlValueAccessor {
  fileTypeConst = FILE_TYPE;
  @Input() fileType: FileType = 'image';
  @Input() multiple = true;
  @Input() disabled = false;
  @Output() onFileChange: EventEmitter<any> = new EventEmitter();

  filesValue: string[] = [];
  isDisabled: boolean = false;
  private onChange?: (val: any) => void;
  private onTouch?: () => void;

  constructor(public dialogService: DialogService) { }

  writeValue(obj: any): void {
    if (obj) {
      this.filesValue = this.multiple ? JSON.parse(obj) : [obj];
    } else {
      this.filesValue = [];
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

  addFile() {
    if (this.onTouch) {
      this.onTouch();
    }
    const ref = this.dialogService.open(MFileManagerModalComponent, {
      header: this.fileType === 'image' ? 'Quản lý ảnh' : 'Quản lý file',
      width: '70%',
      contentStyle: { "overflow": "auto" },
      data: {
        multiple: this.multiple,
        fileType: this.fileType,
        selectFiles: this.filesValue
      }
    });
    ref.onClose.subscribe(res => {
      if (res) {
        this.filesValue = [...res.data];
        if (this.onChange) {
          this.onChange(this.multiple ? JSON.stringify(this.filesValue) : res.data);
        }
        this.onFileChange.next(this.multiple ? { data: this.filesValue } : { data: res.data });
      }
    })
  }

  clearFile() {
    this.filesValue = [];
    if (this.onChange) {
      this.onChange(undefined);
    }
    if (this.onTouch) {
      this.onTouch();
    }
    this.onFileChange.next({ data: undefined });
  }

  removeFile(index: number) {
    if (this.onTouch) {
      this.onTouch();
    }
    this.filesValue.splice(index, 1);
    if (this.onChange) {
      this.onChange(this.multiple ? JSON.stringify(this.filesValue) : undefined);
    }
    this.onFileChange.next(this.multiple ? { data: this.filesValue } : { data: undefined });
  }

  viewImage(index: number) {
    if (this.onTouch) {
      this.onTouch();
    }
    if (this.fileType === 'file') {
      return;
    }
    this.dialogService.open(MFileMangaerViewComponent, {
      width: '70%',
      contentStyle: { "overflow": "auto", "padding": "0" },
      showHeader: false,
      dismissableMask: true,
      data: {
        files: this.filesValue,
        index
      }
    });
  }
}
