import {Component, HostBinding, OnInit} from "@angular/core";
import {releaseName, version} from "../../../../helpers/constants";

@Component({
  selector: "asb-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.less"]
})
export class AsbFooterComponent implements OnInit {
    @HostBinding("class.asb-footer")
    private readonly cssClass = true;
    public date: string;
    public version: string;
    public releaseName: string;
    constructor() { }

    ngOnInit() {
        this.version = version;
        this.releaseName = releaseName;
    }

}
