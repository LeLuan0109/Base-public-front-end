import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'images' })
export class ImagesPipe implements PipeTransform {
  transform(value: string): string {
    if(!value){
      return '';
    }
    const images = JSON.parse(value) as string[];
    let result = '';
    images.forEach(el => {
      result += `<img src="${el}" />`;
    })
    return result;
  }
}
