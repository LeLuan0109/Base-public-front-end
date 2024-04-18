import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MReportToolbarComponent } from './containers/m-report-toolbar/m-report-toolbar.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { MLazyDropdownModule } from '@based/m-lazy-dropdown/m-lazy-dropdown.module';
import { DropdownModule } from 'primeng/dropdown';
import { MCalendarSearchModule } from '@based/m-calendar-search/m-calendar-search.module';

@NgModule({
  declarations: [
    MReportToolbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MCalendarSearchModule,
    // ButtonModule,
    // DividerModule,
    // CalendarModule,
    // MLazyDropdownModule,
    // DropdownModule
  ],
  exports: [
    MReportToolbarComponent
  ]
})
export class MReportToolbarModule { }
