import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'asb-soos',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
