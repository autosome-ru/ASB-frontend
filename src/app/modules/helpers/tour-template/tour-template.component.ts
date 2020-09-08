import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input, OnInit,
    ViewEncapsulation
} from "@angular/core";
import {JoyrideService} from "ngx-joyride";
import {AppState} from "src/app/store/reducer";
import {Store} from "@ngrx/store";
import * as fromSelectors from "src/app/store/selector";
import {ReleaseModel} from "src/app/models/releases.model";
import {Observable, Subscription} from "rxjs";
import {JoyrideOptions} from "ngx-joyride/lib/models/joyride-options.class";
import {MatDialog} from "@angular/material/dialog";
import {AsbConfirmDialogComponent} from "../popover-template/confirm-dialog/confirm-dialog.component";

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
    private subscriptions = new Subscription()


    @Input()
    public steps: string[];
    public release: Observable<ReleaseModel>;

    constructor(private joyrideService: JoyrideService,
                private dialog: MatDialog,
                private store: Store<AppState>) { }

    ngOnInit() {
        this.release = this.store.select(fromSelectors.selectCurrentRelease)
    }


    ngOnDestroy() {
        if (this.joyrideService.isTourInProgress()) {
            this.joyrideService.closeTour()
        }
        this.subscriptions.unsubscribe()
    }


    openTourPopover() {
        const dialogRef = this.dialog.open(AsbConfirmDialogComponent, {
            data: {title: 'Do you want to start the page tour?'}
        });
        this.subscriptions.add(
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.startTour()
                }
            })
        )

    }


    startTour() {
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
