import { environment } from './../../../../../environments/environment';
import { UploadFileInfo } from './../../models/upload-file.model';
import { FileType } from './../../types/file-manager.type';
import { Component, HostListener, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UploadFileFacade } from '../../facades/upload-file.facade';
import { LazyLoadEvent } from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'm-file-manager-modal',
  templateUrl: './m-file-manager-modal.component.html',
  styleUrls: ['./m-file-manager-modal.component.scss']
})
export class MFileManagerModalComponent implements OnInit {
  fileType: FileType = 'image';
  multiple = true;
  folders: string[] = [];
  files: UploadFileInfo[] = []
  rows = 30;
  name = '';
  folderSelect: string | undefined;
  isShowFolder = false;
  folderName = '';
  selectFiles: string[] = [];
  totalElement = 0;
  first = 0;
  isShowDelete = false;
  fileDelete: UploadFileInfo | undefined;
  fileRoot = ''

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private uploadFileFacade: UploadFileFacade, private toastService: ToastService) { }

  ngOnInit(): void {
    this.fileType = this.config.data.fileType;
    if(this.fileType === 'image') {
      this.fileRoot = environment.imageRoot;
    } else {
      this.fileRoot = environment.filleRoot;
    }
    this.multiple = this.config.data.multiple;
    this.selectFiles = this.config.data.selectFiles ?? [];
    this.uploadFileFacade.getAllFolder().subscribe(res => {
      this.folders = res.folderName ?? [];
    })
    this.search();
  }

  loadData() {
    this.uploadFileFacade.filterUploadFile(
      { folder: this.folderSelect, name: this.name }, this.first / this.rows, this.rows
    ).subscribe(res => {
      this.totalElement = res.totalCount ?? 0;
      const loadFiles = res.data ?? [];
      if (this.first === 0) {
        if (this.selectFiles.length > 0) {
          this.selectFiles = [...this.selectFiles.map(r => r.replace(this.fileRoot, ''))];
          const selectFiles = [...this.selectFiles].map(r => ({ id: r }));
          this.files = selectFiles.filter(f1 => loadFiles.findIndex(f2 => f2.id === f1.id) < 0);
        }
      }
      this.files.push(...loadFiles);
    })
  }

  uploadFile(event: any) {
    if (event) {
      this.search();
    }
  }

  selectFolder(folder: string) {
    this.folderSelect = folder;
    this.search();
  }

  search() {
    this.first = 0;
    this.loadData();
  }

  addFolder() {
    this.isShowFolder = true;
  }

  cancelAddFolder() {
    this.isShowFolder = false;
  }

  creatFolder() {
    this.folders.push(this.folderName);
    this.cancelAddFolder();
  }

  selectItem(item: UploadFileInfo) {
    if (!this.multiple && this.selectFiles.length > 1) {
      this.selectFiles = [item.id!];
    }
  }

  close() {
    this.ref.destroy();
  }

  checkFile() {
    this.ref.close({ data: [...this.selectFiles].map(r => this.fileRoot + r) });
  }

  @HostListener('document:wheel', ['$event.target'])
  onScoll(event: any) {
    let element;
    if (event.id === 'fileData') {
      element = event;
    } else if (event.parentNode.id === 'fileData') {
      element = event.parentNode;
    } else if (event.parentNode.parentNode.id === 'fileData') {
      element = event.parentNode.parentNode;
    } else if (event.parentNode.parentNode.parentNode.id === 'fileData') {
      element = event.parentNode.parentNode.parentNode;
    } else if (event.parentNode.parentNode.parentNode.parentNode.id === 'fileData') {
      element = event.parentNode.parentNode.parentNode.parentNode;
    }
    if (element) {
      if ((element.clientHeight + element.scrollTop) >= element.scrollHeight) {
        if (this.first < this.totalElement) {
          this.first += this.rows
          this.loadData();
        }
      }
    }
  }

  deleteFile(item: UploadFileInfo) {
    this.isShowDelete = true;
    this.fileDelete = item;
  }

  cancelDeleteFile() {
    this.isShowDelete = false;
  }

  confirmDeleteFile() {
    this.uploadFileFacade.deleteFile(this.fileDelete!.id!).subscribe(res => {
      const index = this.selectFiles.findIndex(r => r === this.fileDelete?.id);
      if(index > -1) {
        this.selectFiles.splice(index, 1);
      }
      this.loadData();
      this.cancelDeleteFile();
      this.toastService.showSuccess(`Bạn xóa ${this.fileType === 'image' ? 'ảnh' : 'tệp tin'} thành công!`);
    })
  }
}
