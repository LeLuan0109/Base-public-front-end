import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CALENDER_CONFIG_VI } from '@shared/constants/date.constant';
import { TABLE_FILTER_MODE } from '@shared/constants/match-mode-options.constant';
import { ThemeService } from '@shared/services/theme.service';
import { PrimeNGConfig } from 'primeng/api';
import { MsgService } from '../../../websocket/msg.service';
import { ETheme } from '@shared/constants/theme.constant';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  isMenuSmall = true;
  theme = ETheme.LIGHT;

  constructor(private config: PrimeNGConfig, private router: Router, private msgService: MsgService, private themeService: ThemeService) {
    this.config.setTranslation({ ...TABLE_FILTER_MODE, ...CALENDER_CONFIG_VI });
  }

  ngOnInit(): void {
    this.router.events.subscribe(path => {
      // if (path.url != this.url) {
      document.getElementsByClassName('layout-content')[0]?.scrollTo(0, 0);
      // }
    });
  }

  ngAfterViewInit(): void {
    this.msgService.connect();
  }

  ngOnDestroy(): void {
    this.msgService.close();
  }

  onMenuResize(isMenuSmall: boolean) {
    this.isMenuSmall = isMenuSmall
  }

}
