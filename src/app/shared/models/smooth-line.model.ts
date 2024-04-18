import { SeriesOptionsType, TooltipFormatterCallbackFunction } from "highcharts";

export interface smoothLineOptionInput {
    data?: SeriesOptionsType[];
    formatter?: TooltipFormatterCallbackFunction;
    onPointClick?: (data: any) => void;
    title?: string;
    textxAxis?: string;
    textxYxis?: string,
    objectLabel?: string,
    dataLength?: number;
}