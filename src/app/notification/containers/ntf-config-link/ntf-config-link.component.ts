import { MDialogRef } from '@based/m-dialog/refs/m-dialog-ref';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationConfigFacade } from '../../facades/notification-config.facade';
import { ESolnAction } from '@shared/models/type-action.model';

@Component({
  selector: 'app-ntf-config-link',
  templateUrl: './ntf-config-link.component.html',
  styleUrls: ['./ntf-config-link.component.scss'],
  providers: [MDialogRef]
})
export class NtfConfigLinkComponent implements OnInit {
  isLoad = false;
  tabIndex = 0;

  constructor(private mDialogRef: MDialogRef,
    private route: ActivatedRoute,
    private router: Router,
    private ntfConfigFacade: NotificationConfigFacade) { }

  ngOnInit(): void {
    const { id, action, index } = this.route.snapshot.queryParams;
    // if (Number(index) && Number(index) === 1) {
    //   this.tabIndex = 1;
    // }
    if (Number(id) && Number(id) > 0) {
      this.ntfConfigFacade.action = action ? action : ESolnAction.UPDATE;
      // if(this.tabIndex === 0) {
      //   this.ntfConfigFacade.getNtfConfigDetail(Number(id)).subscribe(res => {
      //     this.isLoad = true;
      //   })
      // } else {
      this.ntfConfigFacade.getNtfkeywordConfigDetail(Number(id)).subscribe(res => {
        this.isLoad = true;
      })
      // }
    } else {
      this.isLoad = true;
      this.ntfConfigFacade.action = ESolnAction.INSERT;
    }
    this.mDialogRef.afterClosed.subscribe((res) => {
      this.router.navigate(['/notification/ntf-config'], {
        queryParams: { index: this.tabIndex }
      });
    });
  }

}
