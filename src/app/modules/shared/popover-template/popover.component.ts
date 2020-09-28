import {
    ChangeDetectionStrategy,
    Component,
    Inject, OnInit,
    ViewEncapsulation,
} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: "asb-popover",
    templateUrl: "./popover.component.html",
    styleUrls: ["./popover.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AsbPopoverComponent implements OnInit {
    public title: string;
    public popoverTemplate: any;
    public popoverContext: any;
    constructor(
        public dialogRef: MatDialogRef<AsbPopoverComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.title = this.data.title;
        this.popoverTemplate = this.data.template;
        this.popoverContext = this.data.templateContext;
    }


    closePopover() {
        this.dialogRef.close(null);
    }
}
