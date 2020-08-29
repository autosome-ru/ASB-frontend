import {Component, EventEmitter, HostBinding, OnInit, Output, ViewChild} from "@angular/core";
import {AsbPopoverComponent} from "../popover-template/popover.component";

@Component({
  selector: "asb-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.less"]
})
export class LayoutComponent implements OnInit {
    @ViewChild('popover')
    private popover: AsbPopoverComponent
    @HostBinding("class.asb-layout")
    private readonly cssClass = true;

    @Output()
    helpClickEvent = new EventEmitter<void>()

    constructor() { }
    ngOnInit() {}

    helpClicked() {
        this.popover.title = 'Do you want to star a tour?'
        this.popover.open()
    }

    startTour() {
        this.helpClickEvent.emit()
        this.popover.close()
    }

    closePopover() {
        this.popover.close()
    }
}
