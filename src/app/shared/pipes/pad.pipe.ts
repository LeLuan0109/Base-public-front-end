import { Pipe, PipeTransform } from "@angular/core";
import { readMoneyNumber } from "../constants/read-number.constant"

@Pipe({ name: 'pad' })
export class PadPipe implements PipeTransform {
  transform(value: string | number, n: number): string | number{
    const valueNumber = typeof value === 'string' ? Number(value) : value;
    const l = `${valueNumber}`.length;
    if (n - l > 0) {
      return new Array(n).join('0').slice((n - l || 2) * -1) + valueNumber;
    } else {
      return valueNumber;
    }
  }
}
