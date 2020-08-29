import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input, OnInit,
    ViewChild
} from "@angular/core";
import {AsbPopoverComponent} from "../popover-template/popover.component";
import {JoyrideService} from "ngx-joyride";
import {AppState} from "../../../store/reducer";
import {Store} from "@ngrx/store";
import * as fromSelectors from "src/app/store/selector";
import {ReleaseModel} from "../../../models/releases.model";
import {Observable} from "rxjs";

@Component({
    selector: "asb-tour-button",
    templateUrl: "./tour-template.component.html",
    styleUrls: ["./tour-template.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsbTourComponent implements OnInit {

    @HostBinding("class.asb-popover")
    private cssClass = true;

    @ViewChild('tourPopover')
    private tourPopover: AsbPopoverComponent

    @Input()
    public steps: string[];
    public release: Observable<ReleaseModel>;


    constructor(private joyrideService: JoyrideService, private store: Store<AppState>) { }

    ngOnInit() {
        this.release = this.store.select(fromSelectors.selectCurrentRelease)
    }


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
            steps: this.steps,
            waitingTime: 20,
        })
    }

}
