import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'jsonArrayString' })
export class JsonArrayStringPipe implements PipeTransform {
  transform(value: string): string {
    if(!value){
      return '';
    }
    const result = JSON.parse(value) as string[];
    return result.join(', ');
  }
}
