import { Component, EventEmitter, HostListener, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'm-card',
  templateUrl: './m-card.component.html',
  styleUrls: ['./m-card.component.scss']
})
export class MCardComponent {
  @ViewChild('content', { static: false }) content!: any;
  @Output() onFullscreen = new EventEmitter<string>();
  @Input() title = '';
  @Input() note = '';
  @Input() styleClass = '';
  isFullscreen = false;

  constructor(private renderer: Renderer2) { }

  openFullscreen() {
    const elem = this.content.nativeElement;
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

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  @HostListener('fullscreenchange', ['$event'])
  @HostListener('webkitfullscreenchange', ['$event'])
  @HostListener('mozfullscreenchange', ['$event'])
  @HostListener('MSFullscreenChange', ['$event'])
  screenChange(event: any) {
    const elem = this.content.nativeElement;
    if (elem.classList.contains('view-full')) {
      this.renderer.removeClass(elem, 'view-full');
      this.onFullscreen.emit('exit');
      this.isFullscreen = false;
    } else {
      this.renderer.addClass(elem, 'view-full');
      this.onFullscreen.emit('full');
      this.isFullscreen = true;
    }
  }
}
