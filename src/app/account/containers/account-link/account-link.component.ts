import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MDialogRef } from 'src/app/base-modules/m-dialog/refs/m-dialog-ref';
import { AccountFacade } from '../../facades/account.facade';
import { EToolBarAction } from '@based/m-toolbar/models/toolbar.model';
import { ESolnAction } from '@shared/models/type-action.model';

@Component({
  selector: 'app-account-link',
  templateUrl: './account-link.component.html',
  styleUrls: ['./account-link.component.scss'],
  providers: [MDialogRef],
})
export class AccountLinkComponent implements OnInit {
  isLoad: boolean = false;

  constructor(
    private mDialogRef: MDialogRef,
    private route: ActivatedRoute,
    private router: Router,
    private accountFacade: AccountFacade
  ) {
  }

  ngOnInit(): void {
    const { id, action } = this.route.snapshot.queryParams;
    this.accountFacade.getAllFunction();
    this.accountFacade.getAllAction();
    if (Number(id) && Number(id) > 0) {
      this.accountFacade.action = action ? action : ESolnAction.UPDATE;
      this.accountFacade.getAccountDetail(id).subscribe((_) => {
        this.isLoad = true;
      });
    } else {
      this.accountFacade.action = ESolnAction.INSERT;
      this.isLoad = true;
    }
    this.mDialogRef.afterClosed.subscribe(() => {
      this.router.navigate(['/account']);
    });
  }

}
