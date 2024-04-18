import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GET_TITLE } from '../../constants/title.constant';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {
  constructor(private titleService: Title, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.titleService.setTitle(GET_TITLE(this.router, this.router.routerState.root.snapshot.children).title ?? '');
    });
  }

}
