import { DashboardFacade } from '../../facades/dashboard.facade';
import { Component, OnInit } from '@angular/core';
import { MReportFilterModel } from '@based/m-report-toolbar/models/m-report-toolbar.model';
import { TopProfileInteractModel } from '../../models/top-profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-website-interact',
  templateUrl: './top-website-interact.component.html',
  styleUrls: ['./top-website-interact.component.scss'],
})
export class TopWebsiteInteractComponent implements OnInit {
  websites?: TopProfileInteractModel = {};
  maxPostsValue?: number = 0;
  params: MReportFilterModel = {};

  constructor(private dashboardFacade: DashboardFacade, private router: Router) {}

  ngOnInit(): void {
    this.dashboardFacade.topProfileWebsite$.subscribe((res) => {
      this.websites = { ...res };
      this.maxPostsValue = this.websites.profiles?.[0]?.posts;
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
          domainIds: [item.profileId],
        },
      })
    );
    window.open(url, '_blank');
  }
}
