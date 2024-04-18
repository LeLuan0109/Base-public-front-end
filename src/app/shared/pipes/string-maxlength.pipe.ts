import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strLimit'
})
export class StringMaxLengthPipe implements PipeTransform {
  transform(value: string, limit = 25, completeWords = true, ellipsis = '...') {
    if(!value) {
      return '';
    }
    if (completeWords) {
      limit = value.length <= limit ? value.length : value.substring(0, limit).lastIndexOf(' ')
    }
    return value.length > limit ? value.substring(0, limit) + ellipsis : value;
  }
}