import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";

@Component({
    selector: "asb-help-page",
    templateUrl: "./help-page.component.html",
    styleUrls: ["./help-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpPageComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
