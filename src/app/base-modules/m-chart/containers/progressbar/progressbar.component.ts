import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'm-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

  @Input('value') value: number = 0;
  @Input('rate') rate: number = 0;
  @Input('color') color: string = '';
  @Input('icon') icon: string = '';
  @Input('image') image: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
