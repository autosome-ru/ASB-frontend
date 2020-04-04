import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: "asb-color-scales",
    templateUrl: "./color-scales.component.html",
    styleUrls: ["./color-scales.component.less"]
})
export class ColorScalesComponent implements OnInit {

    @Input()
    public refBase: string;

    @Input()
    public altBase: string;

    constructor() { }

    ngOnInit(): void {
    }

}
