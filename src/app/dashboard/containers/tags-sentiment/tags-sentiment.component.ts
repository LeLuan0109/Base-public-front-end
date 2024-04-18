import { DashboardFacade } from './../../facades/dashboard.facade';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { SentimentByTagModel } from '../../models/sentiment.model';

@Component({
  selector: 'app-tags-sentiment',
  templateUrl: './tags-sentiment.component.html',
  styleUrls: ['./tags-sentiment.component.scss']
})
export class TagsSentimentComponent {
  @ViewChild('chartContent', { static: true }) chartContent!: any;
  @ViewChild('download') download!: ElementRef<HTMLElement>;

  tagSentiment: SentimentByTagModel[] = [];
  totalMax: number = 0;


  constructor(private dashboardFacade: DashboardFacade, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.dashboardFacade.tagsSentiment$.subscribe(res => {
      this.tagSentiment = res.data;
      this.totalMax = res.totalMax
    })
  }

  ngOnChanges(): void { }

  toggleFullscreen() {
    const elem = this.chartContent.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  @HostListener('fullscreenchange', ['$event'])
  @HostListener('webkitfullscreenchange', ['$event'])
  @HostListener('mozfullscreenchange', ['$event'])
  @HostListener('MSFullscreenChange', ['$event'])
  screenChange(event: any) {
    const elem = this.chartContent.nativeElement;
    if (elem.classList.contains('view-full')) {
      this.renderer.removeClass(elem, 'view-full');
    } else {
      this.renderer.addClass(elem, 'view-full');
    }
  }
}
