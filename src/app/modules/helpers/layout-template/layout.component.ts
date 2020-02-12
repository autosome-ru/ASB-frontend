import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'asb-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
    @HostBinding("class.asb-layout")
    private readonly cssClass = true;

    constructor() { }
    ngOnInit() {}

}
