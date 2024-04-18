import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationFacade } from '../../facades/notification.facade';
import { MDialogRef } from '@based/m-dialog/refs/m-dialog-ref';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ntf-link',
  templateUrl: './ntf-link.component.html',
  styleUrls: ['./ntf-link.component.scss'],
  providers: [MDialogRef]
})
export class NtfLinkComponent implements OnInit {
  isLoad = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private nftFacade: NotificationFacade,
    private mDialogRef: MDialogRef
  ) {
  }

  ngOnInit(): void {
    const { id, type } = this.route.snapshot.queryParams;
    if (id) {
      this.nftFacade.getNtfDetail(id).subscribe(res => {
        this.isLoad = true;
      })
    } else {
      this.isLoad = true;
      this.router.navigate([`/notification/ntf-${type === 2 ? 'email' : 'app'}`], { queryParams: { type } });
    }
    this.mDialogRef.afterClosed.subscribe((res) => {
      this.router.navigate([`/notification/ntf-${type === 2 ? 'email' : 'app'}`], { queryParams: { type } });
    });
  }

}
