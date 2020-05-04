import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {baseToColors} from "../../../helpers/colors.helper";

@Component({
    selector: "asb-color-scales",
    templateUrl: "./color-scales.component.html",
    styleUrls: ["./color-scales.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorScalesComponent implements OnInit {

    @Input()
    public refBase: string;

    @Input()
    public altBase: string;

    public colors = baseToColors;

    constructor() { }

    ngOnInit(): void {
    }

}
