export interface UploadFileInfo {
  id?: string;
  folder?: string;
  extension?: string;
  name?: string;
  fileType?: number;
}

export interface FolderInfo{
  folderName?: string[];
}

export interface UploadFileFilter {
  folder?: string;
  name?: string;
  fileType?: number;
}

export interface FilePathDto {
  id?: string;
  folder?: string;
}
