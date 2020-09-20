import {
    ChangeDetectionStrategy,
    Component,
    Inject, OnInit,
    ViewEncapsulation,
} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: "asb-popover",
    templateUrl: "./custom-template-dialog.component.html",
    styleUrls: ["../popover.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CustomTemplateDialogComponent implements OnInit {
    public title: string
    public popoverTemplate: any;
    public popoverContext: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.title = this.data.title
        this.popoverTemplate = this.data.template
        this.popoverContext = this.data.templateContext
    }
}
