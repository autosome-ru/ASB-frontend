import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'astra-snp-annotation-main',
  templateUrl: './snp-annotation-main.component.html',
  styleUrls: ['./snp-annotation-main.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnpAnnotationMainComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
