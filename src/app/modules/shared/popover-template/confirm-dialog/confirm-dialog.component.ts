import {
    ChangeDetectionStrategy,
    Component,
    Inject, OnInit,
    ViewEncapsulation,
} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: "asb-confirm",
    templateUrl: "./confirm-dialog.component.html",
    // styleUrls: ["../popover.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AsbConfirmDialogComponent implements OnInit {
    public title: string;

    constructor(
        public dialogRef: MatDialogRef<AsbConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.title = this.data.title;
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }
}
