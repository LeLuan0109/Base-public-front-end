import { Component, OnInit } from '@angular/core';
import { MDialogConfig } from '@based/m-dialog/refs/m-dailog.config';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit {

  constructor(private dialogConfig: MDialogConfig) {  }

  data:any

  ngOnInit(): void {
   const  { data } = this.dialogConfig
   this.data = data
  }

}
