import { Pipe, PipeTransform } from "@angular/core";
import { DAY_OF_WEEK_OPT } from "@shared/constants/notification.constant";

@Pipe({ name: 'dayOfWeekLabel' })
export class DayOfWeekPipe implements PipeTransform {
  transform(value: string): string {
    const index = DAY_OF_WEEK_OPT.findIndex(r => r.value === value);
    if(index > -1) {
        return DAY_OF_WEEK_OPT[index].label;
    }
    return '';
  }
}
