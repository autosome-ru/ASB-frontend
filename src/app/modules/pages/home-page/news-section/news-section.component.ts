import {ChangeDetectionStrategy, Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'asb-news-section',
    templateUrl: './news-section.component.html',
    styleUrls: ['./news-section.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NewsSectionComponent implements OnInit {
    public showFireworks: boolean = false;
    public fireworksStyle: {left: string, bottom: string};
    @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
        if (!this.showFireworks) {
            this.fireworksStyle = {left: `${event.offsetX}px`, bottom: `calc(100vh-${event.offsetY}px)`}
        }
    }

  constructor() { }

  ngOnInit(): void {
  }

}
