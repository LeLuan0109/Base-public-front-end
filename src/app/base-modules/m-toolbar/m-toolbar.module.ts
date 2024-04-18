import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './containers/toolbar/toolbar.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class MToolbarModule { }
