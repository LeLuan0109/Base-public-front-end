import { ToastService } from './../../../shared/services/toast.service';
import { UploadFileService } from './../services/upload-file.service';
import { Injectable } from "@angular/core";
import { FilePathDto, FolderInfo, UploadFileFilter, UploadFileInfo } from '../models/upload-file.model';
import { catchError, Observable, of } from 'rxjs';
import { PagingData } from 'src/app/shared/models/paging-data.model';
import { ERR_MESSAGE_LABEL } from 'src/app/shared/constants/error-message.constant';

@Injectable({
  providedIn: 'root',
})
export class UploadFileFacade {
  constructor(private uploadFileService: UploadFileService, private toastService: ToastService) { }

  filterUploadFile(filter: UploadFileFilter, pageIndex: number, pageSize: number): Observable<PagingData<UploadFileInfo>> {
    return this.uploadFileService.filterUploadFile(filter, pageIndex, pageSize)
  }

  getAllFolder(): Observable<FolderInfo> {
    return this.uploadFileService.getAllFolder();
  }

  uploadFile(file: File, folder: string): Observable<FilePathDto> {
    return this.uploadFileService.uploadFile(file, folder);
  }

  deleteFile(id: string): Observable<UploadFileInfo | undefined> {
    return this.uploadFileService.deleteFile(id).pipe(
      catchError(err => {
        this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
        return of();
      }));
  }
}
