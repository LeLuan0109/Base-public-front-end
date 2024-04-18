import { IChartOptionInput } from '@shared/models/chart-option-input.model';
import { DecimalPipe } from '@angular/common';
import { smoothLineOptionInput } from '@shared/models/smooth-line.model';

const _decimalPipe = new DecimalPipe('en-US');
const tooltipOptions = {
  borderRadius: 8,
  shadowColor: 'rgba(13, 54, 54, 0.20)',
};
const lineWidth = 2;
const markerRadius = 3;
export const DOUGHNUT_CHART_OPTION = ({ title, data, xAxisLabels, yAxisLabels, objectLabel, onPointClick }: IChartOptionInput = {}): Highcharts.Options => {
  return {
    chart: {
      type: 'pie',
    },
    title: {
      text: title ?? '',
      align: 'center',
      verticalAlign: 'middle',
      y: -5,
    },
    xAxis: {
      categories: xAxisLabels,
    },
    yAxis: {
      categories: yAxisLabels,
    },
    legend: {
      enabled: true,
      labelFormatter: function () {
        return `<span style="color: ${this.color}">${this.name}</span>`;
      },
      itemStyle: {
        fontSize: '12px',
      },
      width: 300,
    },
    tooltip: {
      formatter: function () {
        if (this.y! > 0) {
          const total = this.series.data.reduce((sum, point) => sum + point.y!, 0);
          const percentage = (this.y! / total) * 100;
          return `<b>${this.point.name}</b><br>${percentage.toFixed(2)}%
            <span style='color: var(--text-color)'>(${_decimalPipe.transform(this.y!, '1.0-0')} ${objectLabel})</span>`;
        }
        return '';
      },
      style: {
        fontSize: '12px',
      },
      borderRadius: tooltipOptions.borderRadius,
      shadow: {
        color: tooltipOptions.shadowColor,
      },
      shared: true,
    },
    plotOptions: {
      pie: {
        // allowPointSelect: true,
        cursor: 'pointer',
        innerSize: '70%',
        size: '100%',
        showInLegend: true,
        dataLabels: {
          enabled: false,
        },
        events: {
          click: (e) => {
            if (onPointClick) {
              onPointClick(e.point.name);
            }
          },
        },
      },
    },
    series: data,
  };
};

export const AREA_SPLINE_CHART_OPTION = ({
  title,
  data,
  xAxisLabels,
  yAxisLabels,
  onPointClick,
  onLegendItemClick,
  objectLabel,
  formatter,
}: IChartOptionInput = {}): Highcharts.Options => {
  const MAX_POINT = 12;
  return {
    chart: {
      type: 'areaspline',
    },
    title: {
      text: title,
    },
    xAxis: {
      categories: xAxisLabels,
      tickInterval: xAxisLabels ? Math.ceil(xAxisLabels.length / MAX_POINT) : undefined,
      endOnTick: false,
      gridLineWidth: 1,
      tickmarkPlacement: 'on',
      labels: {
        formatter: function () {
          return `<span style="font-size: 10px; color: var(--subtext-color)">${this.value}</span>`;
        },
      },
    },
    yAxis: {
      gridLineWidth: 0,
      categories: yAxisLabels,
      title: {
        text: '',
      },
      labels: {
        formatter: function () {
          return `<span style="font-size: 10px; color: var(--subtext-color)">${_decimalPipe.transform(this.value, '1.0-0')}</span>`;
        },
      },
    },
    tooltip: {
      formatter:
        formatter ??
        function () {
          return `<b>${this.point.name}</b>
        <br>${_decimalPipe.transform(this.y, '1.0-0')} <span style='color: var(--text-color)'>${objectLabel ?? this.series.name})</span>`;
        },
      style: {
        fontSize: '12px',
      },
      borderRadius: tooltipOptions.borderRadius,
      shadow: {
        color: tooltipOptions.shadowColor,
      },
    },
    legend: {
      enabled: true,
      itemMarginTop: -5,
      labelFormatter: function () {
        return `<span style="color: ${this.color}">${this.name}</span>`;
      },
      itemStyle: {
        fontSize: '12px',
      },
    },
    plotOptions: {
      series: {
        events: {
          legendItemClick: (event) => {
            if (onLegendItemClick) {
              onLegendItemClick(event);
            }
          },
        },
      },
      areaspline: {
        allowPointSelect: true,
        cursor: 'pointer',
        lineWidth,
        pointPlacement: 'on',
        showInLegend: true,
        events: {
          click: (e) => {
            if (onPointClick) {
              onPointClick(e.point.name);
            }
          },
        },
        marker: {
          symbol: 'circle',
          states: {
            hover: {
              radius: markerRadius,
            },
          },
        },
      },
    },
    series: data,
  };
};

export const COMBO_CHART_OPTION = ({ onPointClick, data, formatter, title, textxAxis, textxYxis, objectLabel, dataLength }: smoothLineOptionInput = {}): Highcharts.Options => {
  const MAX_POINT = 12;

  return {
    title: {
      text: title,
    },
    xAxis: {
      tickmarkPlacement: 'on',
      endOnTick: false,
      tickInterval: dataLength ? Math.ceil(dataLength / MAX_POINT) : undefined,
      type: 'category',
      gridLineWidth: 1,
      title: {
        text: textxAxis,
      },
      labels: {
        formatter: function () {
          return `<span style="font-size: 10px; color: var(--subtext-color)">${this.value}</span>`;
        },
      },
    },
    yAxis: {
      gridLineWidth: 0,
      type: 'linear',
      title: {
        text: textxYxis,
      },
      labels: {
        formatter: function () {
          return `<span style="font-size: 10px; color: var(--subtext-color)">${_decimalPipe.transform(this.value, '1.0-0')}</span>`;
        },
      },
    },
    plotOptions: {
      series: {
        pointPlacement: 'on',
        cursor: 'pointer',
        lineWidth: lineWidth,
        states: {
          hover: {
            enabled: true,
            lineWidth: lineWidth + 1,
          },
        },
        marker: {
          symbol: 'circle',
          radius: markerRadius,
        },
        events: {
          click: (event) => {
            if (onPointClick) {
              onPointClick(event.point);
            }
          },
        },
      },
    },
    tooltip: {
      formatter:
        formatter ??
        function () {
          var formattedDate = new Date(this.point.options.label as string).toLocaleDateString('en-GB');
          var s = '<div style="border: 1px solid red"><b>' + formattedDate + '</b>';
          if (this.points && this.points.length > 1) {
            // const _total = this.points?.reduce((a, v: any) => { return a + Math.abs(v.series.data[this.point.index].y as number) }, 0);
            this.points?.forEach((item) => {
              const _value = item.series.data[this.point.index].y as number;
              // const _ratio = _value === 0 ? 0 : (_value == _total ? 100 : (Math.abs(_value) / Math.max(_total!, 1) * 100).toFixed(2));
              s += `<br/><br/> 
                  <div style="color: ${item.series.data[this.point.index].color};">
                  ${item.series.name} : 
                  ${_decimalPipe.transform(_value, '1.0-0')} ${objectLabel}
                  </div>`;
            });
            return s + '</div>';
          }
          return s + `<br/><br/><div>Số bài viết <b>${_decimalPipe.transform(this.point.y, '1.0-0')}</b></div></div>`;
        },
      shared: true,
    },
    legend: {
      enabled: true,
    },

    series: data,
  };
};
