import { NumberFormatStyle } from "@angular/common";

const DIGITS = [
  'không', 'một', 'hai', 'ba', 'bốn',
  'năm', 'sáu', 'bảy', 'tám', 'chín'
];

const MONEY = ["", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ"];

export const readThreeNumbers = (threeNumbers: number): string => {
  let result = '';
  const hundred = Math.floor(threeNumbers / 100);
  const dozen = Math.floor((threeNumbers % 100) / 10);
  const unit = threeNumbers % 10;
  if (hundred == 0 && dozen == 0 && unit == 0) {
    return result;
  };
  if (hundred !== 0) {
    result += DIGITS[hundred] + ' trăm ';
    if (dozen === 0 && unit !== 0) {
      result += ' linh ';
    }
  }
  if (dozen !== 0 && dozen !== 1) {
    result += DIGITS[hundred] + ' mươi ';
  } else if (dozen === 1) {
    result += ' mười ';
  }
  switch (unit) {
    case 1:
      if (dozen !== 0 && dozen !== 1) {
        result += " mốt ";
      } else {
        result += DIGITS[unit];
      }
      break;
    case 5:
      if (hundred === 0) {
        result += DIGITS[unit];
      } else {
        result += " lăm ";
      }
      break;
    case 0:
      break;
    default:
      result += DIGITS[unit];
      break;
  }
  return result;
}

export const readMoneyNumber = (moneyNumber: number): string => {
  if (moneyNumber == 0) return 'Không đồng';
  if (moneyNumber > 8999999999999999) {
    return "Số quá lớn!";
  }

  let result = '';
  let times = 0;
  let moneyNumberCopy = 0;
  const position = [0, 0, 0, 0, 0, 0];
  if (moneyNumber > 0) {
    moneyNumberCopy = moneyNumber;
  } else {
    moneyNumberCopy = -moneyNumber;
  }

  position[5] = Math.floor(moneyNumberCopy / 1000000000000000);
  if (isNaN(position[5])) {
    position[5] = 0;
  }

  moneyNumberCopy = moneyNumberCopy - position[5] * 1000000000000000;
  position[4] = Math.floor(moneyNumberCopy / 1000000000000);
  if (isNaN(position[4])) {
    position[4] = 0;
  }

  moneyNumberCopy = moneyNumberCopy - position[4] * 1000000000000;
  position[3] = Math.floor(moneyNumberCopy / 1000000000);
  if (isNaN(position[3])) {
    position[3] = 0;
  }

  moneyNumberCopy = moneyNumberCopy - position[3] * 1000000000;
  position[2] = Math.floor(moneyNumberCopy / 1000000);
  if (isNaN(position[2])) {
    position[2] = 0;
  }

  position[1] = Math.floor((moneyNumberCopy % 1000000) / 1000);
  if (isNaN(position[1])) {
    position[1] = 0;
  }

  position[0] = Math.floor(moneyNumberCopy % 1000);
  if (isNaN(position[0])) {
    position[0] = 0;
  }

  if (position[5] > 0) {
    times = 5;
  } else if (position[4] > 0) {
    times = 4;
  } else if (position[3] > 0) {
    times = 3;
  } else if (position[2] > 0) {
    times = 2;
  } else if (position[1] > 0) {
    times = 1;
  } else {
    times = 0;
  }

  let tmp = '';
  for (let i = times; i >= 0; i--) {
    tmp = readThreeNumbers(position[i]);
    result += tmp;
    if (position[i] > 0) {
      result += MONEY[i];
    }
    if (i > 0 && tmp.length > 0) {
      result += ',';//&& (!string.IsNullOrEmpty(tmp))
    }
  }

  if (result.substring(result.length - 1) == ',') {
    result = result.substring(0, result.length - 1);
  }
  if (moneyNumber < 0) {
    return 'Âm ' + result;
  }
  return result.substring(0, 1).toUpperCase() + result.substring(1);
}
