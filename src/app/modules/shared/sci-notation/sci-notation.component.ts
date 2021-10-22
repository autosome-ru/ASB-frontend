import {Component, Input, OnInit} from '@angular/core';
import {writeScientificNum} from "../../../functions/scientific.helper";
import {pValueString} from "../../../models/annotation.model";

@Component({
  selector: 'asb-sci-notation',
  templateUrl: './sci-notation.component.html',
  styleUrls: ['./sci-notation.component.less']
})
export class SciNotationComponent implements OnInit {
    @Input()
    value: pValueString;
    @Input()
    precision: number = 2;
    @Input()
    toInvert: boolean = false;
    constructor() { }

    ngOnInit(): void {
    }
    writeScientificNum(num): string {
        return writeScientificNum(num, this.precision, this.toInvert);
    }

}
