import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '../../facade/auth.facade';
import { SpinnerService } from '@shared/services/spinner.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  isVerifed = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authFacade: AuthFacade,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    if (token) {
      this.spinnerService.showWaitAll();
      this.authFacade.verify(token)
        .subscribe({
          next: () => {
            this.spinnerService.hidenAll();
            this.isVerifed = 1;
          },
          error: () => {
            this.isVerifed = 2;
          }
        });
    }
  }

}
