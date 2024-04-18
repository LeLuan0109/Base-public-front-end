export const getDatePickerRangeDown = (rangeNumber = 10): string => {
  const currentDate = new Date();
  const maxYear = currentDate.getFullYear();
  const minYear = maxYear - rangeNumber;
  return minYear + ':' + maxYear;
};
