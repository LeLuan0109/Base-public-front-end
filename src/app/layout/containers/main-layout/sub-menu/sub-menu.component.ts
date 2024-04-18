import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ESubMenuPosition } from 'src/app/layout/constants/sub-menu-position.constant';
import { collapse } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  animations: [collapse(150)],
})
export class SubMenuComponent implements OnInit {
  @Input() items: MenuItem[] = [];
  @Input() position: ESubMenuPosition = ESubMenuPosition.BOTTOM;
  ESubMenuPosition = ESubMenuPosition;
  public collapse = false;


  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.items != null) {
      this.items.forEach((el) => {
        if (this.router.url.startsWith(el.routerLink)) {
          this.collapse = true;
          return;
        }
      });
      if (!this.collapse) {
        this.items.forEach((el) => {
          if (el.items != null) {
            el.items.forEach((sub) => {
              if (this.router.url.startsWith(sub.routerLink)) {
                this.collapse = true;
                return;
              }
            });
            if (this.collapse) {
              return;
            }
          }
        });
      }
    }
  }
}
