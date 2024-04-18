import { UploadFileFacade } from './../../facades/upload-file.facade';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileType } from '../../types/file-manager.type';
import { FilePathDto } from '../../models/upload-file.model';

@Component({
  selector: 'm-file-upload',
  templateUrl: './m-file-upload.component.html',
  styleUrls: ['./m-file-upload.component.scss']
})
export class MFileUploadComponent implements OnInit {
  @Input() foldersOpt: string[] = [];
  @Input() fileType: FileType = 'image';
  @Input() folder: string | undefined;
  @Output() onUploadFile: EventEmitter<FilePathDto> = new EventEmitter();
  isShowFolder = false;

  file: File | undefined;

  constructor(private uploadFileFacade: UploadFileFacade) { }

  ngOnInit(): void {
  }

  selectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  clearFile(fileUpload: any) {
    fileUpload.value = '';
    this.file = undefined;
  }

  uploadFile(fileUpload: any) {
    if (!this.folder) {
      this.isShowFolder = true;
      return;
    }
    this.uploadFileFacade.uploadFile(this.file!, this.folder!).subscribe(res => {
      if (this.isShowFolder) {
        this.cancelAddFolder();
      }
      if (res) {
        this.clearFile(fileUpload);
        this.onUploadFile.emit(res);
      }
    })
  }

  cancelAddFolder() {
    this.isShowFolder = false;
    this.folder = undefined;
  }
}
