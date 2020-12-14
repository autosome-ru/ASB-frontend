import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'asb-ananas-help',
    templateUrl: './ananas-help.component.html',
    styleUrls: ['./ananas-help.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnanasHelpComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
