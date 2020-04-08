import {Component, HostBinding, OnInit} from "@angular/core";
import {version} from "../../../../helpers/constants";


@Component({
  selector: "asb-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"]
})
export class AsbHeaderComponent implements OnInit {
    @HostBinding("class.asb-header")
    private readonly cssClass = true;
    navbarOpen: boolean = false;
    public version: string;

    constructor() {}

    ngOnInit() {
        this.version = version;
    }

    toggleNavbar(event: "toggle" | "close") {
        if (event === "toggle") {
            this.navbarOpen = !this.navbarOpen;
        } else {
            this.navbarOpen = false;
        }
    }
}
