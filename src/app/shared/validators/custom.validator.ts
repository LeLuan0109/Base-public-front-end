import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CustomVaidators {
  public static NoWhiteSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }
      // value truyền vào
      return (control.value || '').trim().length === 0
        ? { whitespace: true }
        : {};
    };
  }

  public static ConfirmMatchValidator(
    matchingControl: AbstractControl
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (
        matchingControl &&
        matchingControl.errors &&
        !matchingControl.errors['confirmMatchValidator']
      ) {
        return {};
      }
      if (control.value !== matchingControl.value) {
        return { mustMatch: true };
      } else {
        return {};
      }
    };
  }

  public static ArrayColorsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let check = true;
      if (control.value) {
        const value = [...control.value];
        value.forEach((val) => {
          if (
            /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(String(val)) === false
          ) {
            check = false;
          }
        });
        if (check) {
        } else {
          return { colors: false };
        }
      }

      if (control.value || check) {
        const value = [...control.value];
        value.forEach((val) => {
          if (value.filter((x) => x === val).length >= 2) {
            check = false;
          }
        });
      }
      return check ? null : { colors: true };
    };
  }

  public static SVGImgValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      // value truyền vào
      const check =
        (control.value || '').trim().length < 1 ||
        !control.value.match(/\@[a-z0-9]{0,25}\@/g);
      return check ? { imgKeyEmpty: true } : {};
    };
  }

  public static bindingCompareValidator(
    lControlName: string,
    rControlName: string
  ) {
    return (formGroup: FormGroup) => {
      const lControl = formGroup.controls[lControlName];
      const rControl = formGroup.controls[rControlName];
      if (rControl.errors && !rControl.errors['binding']) {
        return;
      }
      if (+lControl.value >= +rControl.value) {
        lControl.setErrors({ binding: true });
        rControl.setErrors({ binding: true });
      } else {
        rControl.setErrors(null);
        lControl.setErrors(null);
      }
    };
  }

  public static dateCompareValidator(
    lControlName: string,
    rControlName: string
  ) {
    return (formGroup: FormGroup) => {
      const lControl = formGroup.controls[lControlName];
      const rControl = formGroup.controls[rControlName];
      if (rControl.errors && !rControl.errors['binding']) {
        return;
      }
      const lValue = lControl.value as Date;
      const rValue = rControl.value as Date;
      if (lValue.getTime() > rValue.getTime()) {
        lControl.setErrors({ binding: true });
        rControl.setErrors({ binding: true });
      } else {
        rControl.setErrors(null);
        lControl.setErrors(null);
      }
    };
  }

  public static chipsDuplicate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      // value truyền vào
      if (!control.value || control.value.length < 2) {
        return {};
      }
      return new Set(control.value).size !== control.value.length ? { duplicate: true } : {}
    };
  }
  public static chipsPattern(pattern: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      // value truyền vào
      if (control.value && control.value.length > 0) {
        for (let el of control.value) {
          if (!el.match(pattern)) {
            return { pattern: true };
          }
        }
      }
      return {};
    };
  }
}
