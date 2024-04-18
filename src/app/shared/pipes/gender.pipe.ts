import { Pipe, PipeTransform } from "@angular/core";
import { GENDER_OPT } from "../constants/gender.constant";

@Pipe({ name: 'gender' })
export class GenderPipe implements PipeTransform {
  transform(value: string | number): string {
    const gender = typeof value === 'string' ? Number(value) : value;
    var index = GENDER_OPT.findIndex(g => g.value === gender);
    if (index > -1) {
      return GENDER_OPT[index].label!;
    }
    return GENDER_OPT[GENDER_OPT.length - 1].label!;
  }
}
