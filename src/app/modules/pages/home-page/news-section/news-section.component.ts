import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'asb-news-section',
    templateUrl: './news-section.component.html',
    styleUrls: ['./news-section.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NewsSectionComponent implements OnInit {
    public showFireworks: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
