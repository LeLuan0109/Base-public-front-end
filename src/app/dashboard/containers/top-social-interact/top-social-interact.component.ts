import { DashboardFacade } from './../../facades/dashboard.facade';
import { Component, OnInit } from '@angular/core';
import { MReportFilterModel } from '@based/m-report-toolbar/models/m-report-toolbar.model';
import { TopProfileInteractModel } from '../../models/top-profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-social-interact',
  templateUrl: './top-social-interact.component.html',
  styleUrls: ['./top-social-interact.component.scss'],
})
export class TopSocialInteractComponent implements OnInit {
  social?: TopProfileInteractModel = {};
  maxInteractValue?: number = 0;
  params: MReportFilterModel = {};

  constructor(private dashboardFacade: DashboardFacade, private router: Router) {}

  ngOnInit(): void {
    this.dashboardFacade.topProfileSocial$.subscribe((res) => {
      this.social = { ...res };
      this.maxInteractValue = this.social.profiles?.[0]?.interact;
    });
    this.dashboardFacade.filterData$.subscribe((res) => {
      this.params = res;
    });
  }

  showPosts(item: any) {
    let url = '';
    url = this.router.serializeUrl(
      this.router.createUrlTree([`/posts`], {
        queryParams: {
          startDate: this.params.startDate,
          endDate: this.params.endDate,
          spam: 0,
          completed: 1,
          profileIds: [item.profileId],
        },
      })
    );
    window.open(url, '_blank');
  }
}
