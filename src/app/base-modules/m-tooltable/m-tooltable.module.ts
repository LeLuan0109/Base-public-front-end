import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MTooltableComponent } from './containers/m-tooltable/m-tooltable.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    MTooltableComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule
  ],
  exports: [
    MTooltableComponent
  ]
})
export class MTooltableModule { }
