import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ESubMenuPosition } from 'src/app/layout/constants/sub-menu-position.constant';
import {
  collapse,
  collapseMenu,
} from '@shared/animations/animations';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  animations: [collapseMenu(150), collapse(150)],
})
export class SidebarMenuComponent implements OnInit {
  @Input() item: MenuItem = {};
  @Input() subMenuPosition = ESubMenuPosition.BOTTOM;
  ESubMenuPosition = ESubMenuPosition;
  currentUrl = '';


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.router.events.subscribe(re => {
      this.currentUrl = this.router.url;
    })
  }

  checkUrlAcrive(url: string): boolean {
    if (url) {
      let a = url.slice(
        0,
        url.indexOf('?') > -1 ? url.indexOf('?') : url.length
      );
      let b = this.currentUrl.slice(
        0,
        this.currentUrl.indexOf('?') > -1
          ? this.currentUrl.indexOf('?')
          : this.currentUrl.length
      );
      return a === b;
    }
    return false;
  }
}
