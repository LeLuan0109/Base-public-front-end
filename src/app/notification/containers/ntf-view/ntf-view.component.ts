import { Component, OnInit } from '@angular/core';
import { NotificationFacade } from '../../facades/notification.facade';
import { NtfInfo } from '../../models/notification.model';
import { MDialogRef } from '@based/m-dialog/refs/m-dialog-ref';
import { FREQUENCY_OPT, SEND_TYPE, TIME_TYPE } from '@shared/constants/notification.constant';

@Component({
  selector: 'app-ntf-view',
  templateUrl: './ntf-view.component.html',
  styleUrls: ['./ntf-view.component.scss']
})
export class NtfViewComponent implements OnInit {
  sendType = SEND_TYPE;
  timeType = TIME_TYPE;
  frequncyOpt = FREQUENCY_OPT;

  ntfInfo: NtfInfo = {};

  constructor(private ntfFacade: NotificationFacade, private dialogRef: MDialogRef) { }

  ngOnInit(): void {
    this.ntfFacade.ntfSingle$.subscribe(res => {
      this.ntfInfo = res;
    })
  }

  close() {
    this.dialogRef.close();
  }

}
