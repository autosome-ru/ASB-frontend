import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    ViewChild
} from "@angular/core";
import {AsbPopoverComponent} from "../popover-template/popover.component";
import {JoyrideService} from "ngx-joyride";

@Component({
    selector: "asb-tour-button",
    templateUrl: "./tour-template.component.html",
    styleUrls: ["./tour-template.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsbTourComponent {

    @HostBinding("class.asb-popover")
    private cssClass = true;

    @ViewChild('tourPopover')
    private tourPopover: AsbPopoverComponent

    @Input()
    public steps: string[];


    constructor(private joyrideService: JoyrideService) { }



    openTourPopover() {
        this.tourPopover.title = 'Do you want to start the page tour?'
        this.tourPopover.open()
    }


    closePopover() {
        this.tourPopover.close()
    }

    startTour() {
        this.closePopover()
        this.joyrideService.startTour({
            steps: this.steps
        })
    }

}
