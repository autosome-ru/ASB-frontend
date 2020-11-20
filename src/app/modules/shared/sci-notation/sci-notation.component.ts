import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {writeScientificNum} from "../../../functions/scientific.helper";

@Component({
  selector: 'asb-sci-notation',
  templateUrl: './sci-notation.component.html',
  styleUrls: ['./sci-notation.component.less']
})
export class SciNotationComponent implements OnInit {
    @ViewChild('fdrViewTemplate', {static: true})
    private fdrViewTemplate: TemplateRef<{value: number}>;
    @Input()
    value: number;
    @Input()
    toInvert: boolean = false;
    constructor() { }

    ngOnInit(): void {
    }
    writeScientificNum(num, precision): string {
        return writeScientificNum((this.toInvert ? -1 : 1) * num, precision);
    }

}
