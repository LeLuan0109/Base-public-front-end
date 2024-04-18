import { FilterMetadata } from "primeng/api"

export const convertFilter = (data?: { [s: string]: FilterMetadata }): { [s: string]: any } => {
  const result: { [s: string]: any } = {};
  if (!data) {
    return result;
  }

  Object.entries(data).forEach(([key, val]) => {
    if (val && val.value !== undefined && val.value !== null) {
      if (val.value instanceof Date) {
        const vl = val.value as Date;
        vl.setHours(0);
        vl.setMinutes(0);
        vl.setMilliseconds(0);
        vl.setSeconds(0);
        result[key] = vl.getTime() / 1000;
      } else {
        result[key] = trimData(val.value);
      }
    } else {
      result[key] = undefined
    }
  })
  return result;
}

const trimData = (data: any) => {
  if (data instanceof String || typeof data === 'string') {
    return data.trim();
  }
  return data;
}