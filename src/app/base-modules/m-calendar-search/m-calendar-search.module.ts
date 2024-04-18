import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MCalendarSearchComponent } from './containers/m-calendar-search/m-calendar-search.component';
import { ListboxModule } from 'primeng/listbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MCalendarSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ListboxModule,
    OverlayPanelModule,
    CalendarModule,
  ],
  exports: [
    MCalendarSearchComponent
  ]
})
export class MCalendarSearchModule { }
