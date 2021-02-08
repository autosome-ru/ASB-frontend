import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'asb-fdr-select',
    templateUrl: './fdr-select.component.html',
    styleUrls: ['./fdr-select.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FdrSelectComponent implements OnInit {

    @Input()
    control: FormControl
    constructor() { }

    ngOnInit(): void {
    }

}
