import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MInputSearchComponent } from './containers/m-search-input/m-input-search.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    MInputSearchComponent,
  ],
  imports: [CommonModule, OverlayPanelModule, InputTextModule, FormsModule, ButtonModule],
  exports: [
    MInputSearchComponent
  ],
})
export class MInputSeachModule { }
