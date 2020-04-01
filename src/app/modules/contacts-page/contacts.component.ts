import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
    selector: "asb-about-us",
    templateUrl: "./contacts.component.html",
    styleUrls: ["./contacts.component.less"]
})
export class ContactsComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private titleService: Title) {}
    ngOnInit() {
        this.titleService.setTitle(this.route.snapshot.data.title);
    }

}
