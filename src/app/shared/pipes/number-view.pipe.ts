import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberView' })
export class NumberViewPipe implements PipeTransform {
  transform(value: number | string): string {
    if (!value) {
      return '0';
    }
    try {
      const n = typeof value === 'string' ? Number(value) : value;
      if(isNaN(n)) {
        return '0';
      }
      if (n > 1000000000) {
        return Math.round((n / 1000000000) * 10) / 10 + 'B';
      }
      if (n > 1000000) {
        return Math.round((n / 1000000) * 10) / 10 + 'M';
      }
      if (n > 1000) {
        return Math.round((n / 1000) * 10) / 10 + 'K';
      }
      return n.toString();
    } catch (e) {
      return '0';
    }
  }
}
