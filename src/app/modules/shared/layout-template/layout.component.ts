import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {AsbPopoverComponent} from "../popover-template/popover.component";

@Component({
    selector: "asb-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
    @ViewChild('popover')
    private popover: AsbPopoverComponent
    @HostBinding("class.asb-layout")
    private readonly cssClass = true;

    constructor() { }
    ngOnInit() {}
}
