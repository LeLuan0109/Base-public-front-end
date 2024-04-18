import { Pipe, PipeTransform } from "@angular/core";
import { readMoneyNumber } from "../constants/read-number.constant"

@Pipe({ name: 'readMoney' })
export class ReadMoneyPipe implements PipeTransform {
  transform(value: string | number): string {
    const valueNumber = typeof value === 'string' ? Number(value) : value;
    return readMoneyNumber(valueNumber);
  }
}
