import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewChild,
} from "@angular/core";
import { CdkPortal } from "@angular/cdk/portal";
import {
    Overlay,
    // OverlayConfig,
    OverlayRef,
    ScrollStrategy,
    ScrollStrategyOptions
} from "@angular/cdk/overlay";

@Component({
    selector: "asb-popover",
    templateUrl: "./popover.component.html",
    styleUrls: ["./popover.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsbPopoverComponent {

    @HostBinding("class.asb-popover")
    private cssClass = true;
    scrollStrategy: ScrollStrategy;
    @ViewChild(CdkPortal, {static: true})
    public portal: CdkPortal;

    @Input()
    public title: string;

    @Input()
    public cardClass: string;

    @Input()
    public align: "center" | "top" | "bottom";

    @Output()
    public popoverClosed = new EventEmitter<void>();

    private overlayRef: OverlayRef;

    constructor(private overlay: Overlay, private readonly sso: ScrollStrategyOptions) {
        this.scrollStrategy = this.sso.block();

    }

    public open(): void {
        if (this.overlayRef) {
            console.warn("Tried to popover, but overlay already opened");
            return;
        }

        if (!this.portal) {
            console.warn("Tried to popover, but portal is absent");
            return;
        }
        // const config = new OverlayConfig({
        //     scrollStrategy: this.scrollStrategy});
        this.overlayRef = this.overlay.create();
        this.overlayRef.attach(this.portal);
    }

    public close(): void {
        this.overlayRef.dispose();
        this.overlayRef = null;
        this.popoverClosed.emit();
    }

}
