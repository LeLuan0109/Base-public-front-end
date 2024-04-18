import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MDialogRef } from 'src/app/base-modules/m-dialog/refs/m-dialog-ref';
import { AccountFacade } from '../../facades/account.facade';

@Component({
  selector: 'app-account-password-link',
  templateUrl: './account-password-link.component.html',
  styleUrls: ['./account-password-link.component.scss'],
  providers: [MDialogRef],
})
export class AccountPasswordLinkComponent implements OnInit {
  isLoad: boolean = false;

  constructor(
    private mDialogRef: MDialogRef,
    private route: ActivatedRoute,
    private router: Router,
    private accountFacade: AccountFacade
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (Number(id) && Number(id) > 0) {
      this.accountFacade.getAccountDetail(Number(id)).subscribe((_) => {
        this.isLoad = true;
      });
    } else {
      this.router.navigate(['/account']);
    }
    this.mDialogRef.afterClosed.subscribe(() => {
      this.router.navigate(['/account']);
    });
  }

}
