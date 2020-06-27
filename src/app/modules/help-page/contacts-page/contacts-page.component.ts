import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";


@Component({
    selector: "asb-contacts",
    templateUrl: "./contacts-page.component.html",
    styleUrls: ["./contacts-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsPageComponent implements OnInit {

    constructor() {}

    ngOnInit() {

    }

}
