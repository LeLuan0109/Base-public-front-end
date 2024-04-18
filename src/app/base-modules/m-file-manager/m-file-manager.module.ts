import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MFileManagerComponent } from './containers/m-file-manager/m-file-manager.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MFileManagerModalComponent } from './containers/m-file-manager-modal/m-file-manager-modal.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MFileMangaerViewComponent } from './containers/m-file-mangaer-view/m-file-mangaer-view.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { MFileUploadComponent } from './containers/m-file-upload/m-file-upload.component';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [
    MFileManagerComponent,
    MFileManagerModalComponent,
    MFileMangaerViewComponent,
    MFileUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DynamicDialogModule,
    VirtualScrollerModule,
    DropdownModule,
    TooltipModule,
    CheckboxModule,
  ],
  exports: [
    MFileManagerComponent
  ],
})
export class MFileManagerModule { }
