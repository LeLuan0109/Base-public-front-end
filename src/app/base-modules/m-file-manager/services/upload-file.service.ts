import { DELETE_FILE_MUTATION } from './../../../graphql/query/upload-file.graphql';
import { ApiService } from './../../../shared/services/api.service';
import { UploadFileInfo, FolderInfo, FilePathDto } from './../models/upload-file.model';
import { Observable } from 'rxjs';
import { GraphqlService } from 'src/app/graphql/graphql.service';
import { Injectable } from "@angular/core";
import { UploadFileFilter } from '../models/upload-file.model';
import { PagingData } from 'src/app/shared/models/paging-data.model';
import { FILTER_UPLOAD_FILE_QUERY, GET_ALL_FOLDER_QUERY } from 'src/app/graphql/query/upload-file.graphql';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  ROOT = 'upload-file';
  constructor(private graphqlService: GraphqlService, private apiService: ApiService) { }

  filterUploadFile(filter: UploadFileFilter, pageIndex: number, pageSize: number): Observable<PagingData<UploadFileInfo>> {
    return this.graphqlService.query(FILTER_UPLOAD_FILE_QUERY, { filter, pageIndex, pageSize });
  }

  getAllFolder(): Observable<FolderInfo> {
    return this.graphqlService.query(GET_ALL_FOLDER_QUERY);
  }

  uploadFile(file: File, folder: string): Observable<FilePathDto> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    return this.apiService.postUploadFile(this.ROOT, formData);
  }

  deleteFile(id: string): Observable<UploadFileInfo> {
    return this.graphqlService.mutation(DELETE_FILE_MUTATION, { id });
  }
}
