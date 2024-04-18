import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { MLazyMultiSelectComponent } from './containers/m-lazy-dropdown/m-lazy-multi-select.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "@shared/shared.module";
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    MLazyMultiSelectComponent,
  ],
  imports: [CommonModule, FormsModule, OverlayPanelModule, ButtonModule, InputTextModule, TableModule, TooltipModule, SharedModule],
  exports: [
    MLazyMultiSelectComponent
  ],
})
export class MLazyMultiSelectModule { }
