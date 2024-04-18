import { PadPipe } from '@pipes/pad.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { GenderPipe } from '@pipes/gender.pipe';
import { ImagesPipe } from '@pipes/images.pipe';
import { ReadMoneyPipe } from '@pipes/read-mony.pipe';
import { NumberViewPipe } from '@pipes/number-view.pipe';
import { StringMaxLengthPipe } from '@pipes/string-maxlength.pipe'
import { ChangeOnBlurDirective } from './directives/change-on-blur';
import { DayOfWeekPipe } from './pipes/day-of-week.pipe';
import { JsonArrayStringPipe } from './pipes/json-array-string.pipe';
@NgModule({
  declarations: [
    GenderPipe,
    ImagesPipe,
    ReadMoneyPipe,
    PadPipe,
    NumberViewPipe,
    StringMaxLengthPipe,
    ChangeOnBlurDirective,
    DayOfWeekPipe,
    JsonArrayStringPipe
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TieredMenuModule,
    TooltipModule,
    MultiSelectModule
  ],
  exports: [
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    TieredMenuModule,
    TooltipModule,
    MultiSelectModule,
    TableModule,
    GenderPipe,
    ImagesPipe,
    ReadMoneyPipe,
    PadPipe,
    NumberViewPipe,
    StringMaxLengthPipe,
    ChangeOnBlurDirective,
    DayOfWeekPipe,
    JsonArrayStringPipe
  ],
})
export class SharedModule { }
