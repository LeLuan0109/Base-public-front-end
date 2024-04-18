import { AuthFacade } from 'src/app/auth/facade/auth.facade';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MDialogRef } from 'src/app/base-modules/m-dialog/refs/m-dialog-ref';
import { UserFacade } from '../../facades/user.facade';
import { ESolnAction } from '@shared/models/type-action.model';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.scss'],
  providers: [MDialogRef],
})
export class UserLinkComponent implements OnInit {
  isLoad: boolean = false;

  constructor(
    private mDialogRef: MDialogRef,
    private route: ActivatedRoute,
    private router: Router,
    private userFacade: UserFacade,
    private authFacade: AuthFacade
  ) {
  }

  ngOnInit(): void {
    const { id, action } = this.route.snapshot.queryParams;
    this.userFacade.getAllGroup();
    this.userFacade.getAllAction();
    this.userFacade.getAllFunction();
    if (Number(id) && Number(id) > 0) {
      this.userFacade.action = action ? action : ESolnAction.UPDATE;
      this.userFacade.getUserDetail(id).subscribe((_) => {
        this.isLoad = true;
      });
    } else {
      this.userFacade.action = ESolnAction.INSERT;
      this.isLoad = true;
    }
    this.mDialogRef.afterClosed.subscribe(() => {
      if(this.userFacade.action$ === ESolnAction.UPDATE || this.userFacade.action$ === ESolnAction.DELEGATE) {
        this.authFacade.getMe().subscribe(res => {
          location.reload();
        });
      }
      this.router.navigate(['/user']);
    });
  }

}
