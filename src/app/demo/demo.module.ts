import { NgModule } from '@angular/core';
import { DemoRoutingModule } from './demo-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [],
  providers: [
  ],
  imports: [
    CommonModule,
    DemoRoutingModule
  ]
})
export class DemoModule { }