import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'asb-soos',
  templateUrl: './soos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
