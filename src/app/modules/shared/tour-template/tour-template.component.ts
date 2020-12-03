import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input, OnDestroy,
    ViewEncapsulation
} from "@angular/core";
import {JoyrideService} from "ngx-joyride";
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
export class AsbTourComponent implements OnDestroy {

    @HostBinding("class.asb-popover")
    private cssClass = true;
    private subscriptions = new Subscription();


    @Input()
    public steps: string[];

    @Input()
    public buttonClass: string = null;
    public release: Observable<ReleaseModel>;

    constructor(private joyrideService: JoyrideService,
                private dialog: MatDialog,
                ) { }

    ngOnDestroy() {
        if (this.joyrideService.isTourInProgress()) {
            this.joyrideService.closeTour();
        }
        this.subscriptions.unsubscribe();
    }


    openTourPopover() {
        const dialogRef = this.dialog.open(AsbConfirmDialogComponent, {
            data: {title: "Do you want to start the page tour?"}
        });
        this.subscriptions.add(
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.startTour();
                }
            })
        );

    }


    startTour() {
        const tourOptions: JoyrideOptions = {
            steps: this.steps,
            waitingTime: 40,
            stepDefaultPosition: "top",
        };

        this.joyrideService.startTour(
            tourOptions
        );

    }

}
