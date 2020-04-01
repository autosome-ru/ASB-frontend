import {Component, Input, OnInit, } from "@angular/core";
import {SnpInfoModel, SnpSearchModel} from "src/app/models/data.model";

@Component({
    selector: "asb-snp-header",
    templateUrl: "./snp-header.component.html",
    styleUrls: ["../snp-card.component.less"]
})
export class AsbSnpHeaderComponent implements OnInit {

    @Input()
    public data: SnpSearchModel | SnpInfoModel;
    @Input()
    public snpCard: boolean = true;

    constructor() {}
    ngOnInit() {

    }
}
