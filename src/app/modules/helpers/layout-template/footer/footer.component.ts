import {Component, HostBinding, OnInit} from "@angular/core";

@Component({
  selector: "asb-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.less"]
})
export class AsbFooterComponent implements OnInit {
    @HostBinding("class.asb-footer")
    private readonly cssClass = true;
    public date: string;
    constructor() { }

    ngOnInit() {
    }

}
