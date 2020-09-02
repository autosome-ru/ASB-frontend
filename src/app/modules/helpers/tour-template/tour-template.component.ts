import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input, OnInit,
    ViewChild, ViewEncapsulation
} from "@angular/core";
import {AsbPopoverComponent} from "../popover-template/popover.component";
import {JoyrideService} from "ngx-joyride";
import {AppState} from "src/app/store/reducer";
import {Store} from "@ngrx/store";
import * as fromSelectors from "src/app/store/selector";
import {ReleaseModel} from "src/app/models/releases.model";
import {Observable} from "rxjs";
import {JoyrideOptions} from "ngx-joyride/lib/models/joyride-options.class";

@Component({
    selector: "asb-tour-button",
    templateUrl: "./tour-template.component.html",
    styleUrls: ["./tour-template.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
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


    ngOnDestroy() {
        if (this.joyrideService.isTourInProgress()) {
            this.joyrideService.closeTour()
        }
        this.closePopover()
    }


    openTourPopover() {
        this.tourPopover.title = 'Do you want to start the page tour?'
        this.tourPopover.open()
    }


    closePopover() {
        if (this.tourPopover) {
            this.tourPopover.close()
        }
    }

    startTour() {
        this.closePopover()
        let tourOptions: JoyrideOptions = {
            steps: this.steps,
            waitingTime: 40,
            stepDefaultPosition: 'top',
        }

        this.joyrideService.startTour(
            tourOptions
        )

    }

}
