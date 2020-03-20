import {Component, HostBinding, OnInit} from "@angular/core";


@Component({
  selector: "asb-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"]
})
export class AsbHeaderComponent implements OnInit {
    @HostBinding("class.asb-header")
    private readonly cssClass = true;
    navbarOpen: boolean = false;

    constructor() {}

    ngOnInit() {}

    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }
}
