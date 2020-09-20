import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation} from "@angular/core";

@Component({
    selector: "asb-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
    @HostBinding("class.asb-layout")
    private readonly cssClass = true;

    constructor() { }
    ngOnInit() {}
}
