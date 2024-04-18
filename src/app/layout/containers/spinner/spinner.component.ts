import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements AfterViewInit {

  loading = true;

  constructor(private spinnerService: SpinnerService, private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.spinnerService.spinner$.subscribe(res => {
      this.loading = res;
      this.cd.detectChanges();
    });
  }
}
