import {ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'asb-news-section',
    templateUrl: './news-section.component.html',
    styleUrls: ['./news-section.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NewsSectionComponent implements OnInit, OnDestroy {
    public showFireworks: boolean = false;
    public fireworksStyle: {left: string, bottom: string};
    private timeoutId: number;
    @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
        if (!this.showFireworks) {
            this.fireworksStyle = {left: `${event.clientX}px`, bottom: `calc(100vh - ${event.clientY}px)`}
        }
    }

  constructor() { }

  ngOnInit(): void {
  }

    clearFireworksTimeout() {
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId)
        }
    }
    mouseOut() {
        this.timeoutId = window.setTimeout(() => {
            this.showFireworks = false;
            this.clearFireworksTimeout()
        }, 500)

    }
    ngOnDestroy() {
        this.clearFireworksTimeout()
    }
}
