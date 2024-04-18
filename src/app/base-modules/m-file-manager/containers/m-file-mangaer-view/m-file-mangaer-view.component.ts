import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'm-file-mangaer-view',
  templateUrl: './m-file-mangaer-view.component.html',
  styleUrls: ['./m-file-mangaer-view.component.scss']
})
export class MFileMangaerViewComponent implements OnInit {
  files: string[] = [];
  index = 0;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.files = this.config.data.files;
    this.index = this.config.data.index;
  }

  previous() {
    if (this.index > 0) {
      this.index -= 1;
    }
  }

  next() {
    if (this.index < this.files.length - 1) {
      this.index += 1;
    }
  }
}
