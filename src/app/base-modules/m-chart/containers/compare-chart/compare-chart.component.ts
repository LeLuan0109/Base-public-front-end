import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICompartData } from '@shared/models/chart-info.model'; 

@Component({
  selector: 'compare-chart',
  templateUrl: './compare-chart.component.html',
  styleUrls: ['./compare-chart.component.scss']
})
export class CompareChartComponent implements OnInit {
  @Input() data: ICompartData[] = []
  @Output() click: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick(e: number) {
    this.click.emit(e)
  }

}
