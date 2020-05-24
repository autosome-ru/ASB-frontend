import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output, TemplateRef,
    ViewChild, ViewContainerRef,
} from "@angular/core";
import {TemplatePortal} from "@angular/cdk/portal";
import {
    Overlay, OverlayConfig,
    OverlayRef,
} from "@angular/cdk/overlay";
import {Subscription} from "rxjs";

@Component({
    selector: "asb-popover",
    templateUrl: "./popover.component.html",
    styleUrls: ["./popover.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsbPopoverComponent {

    @HostBinding("class.asb-popover")
    private cssClass = true;
    @ViewChild("portal", {static: true})
    public portalTemplate: TemplateRef<any>;

    @Input()
    public title: string;

    @Input()
    public cardClass: string;

    @Input()
    public align: "center" | "top" | "bottom";

    @Output()
    public popoverClosed = new EventEmitter<void>();

    private overlayRef: OverlayRef;
    public opened: boolean = false;
    private subscriptions: Subscription = new Subscription();

    constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) { }

    public open(): void {
        if (this.overlayRef) {
            console.warn("Tried to popover, but overlay already opened");
            return;
        }
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        this.overlayRef = this.overlay.create(overlayConfig);
        const filePortal = new TemplatePortal(this.portalTemplate, this.viewContainerRef);
        this.opened = true;
        this.overlayRef.attach(filePortal);
        this.subscriptions.add(this.overlayRef.backdropClick().subscribe(() => this.close()));
    }

    public close(): void {
        this.opened = false;
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
            this.popoverClosed.emit();
            this.subscriptions.unsubscribe();
        }
    }

}
