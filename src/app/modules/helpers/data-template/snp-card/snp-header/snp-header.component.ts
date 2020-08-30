import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {SnpInfoModel, SnpSearchModel} from "src/app/models/data.model";
import {baseToColors} from "../../../../../helpers/colors.helper";
import {getTextByStepName} from "../../../../../helpers/tour-text.helper";

@Component({
    selector: "asb-snp-header",
    templateUrl: "./snp-header.component.html",
    styleUrls: ["../snp-card.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsbSnpHeaderComponent implements OnInit {

    @Input()
    public data: SnpSearchModel | SnpInfoModel;
    @Input()
    public snpCard: boolean = true;
    colors: {[base: string]: string} = baseToColors;

    constructor() {}
    ngOnInit() {
    }

    getTextByStepName(step: string) {
        return getTextByStepName(step)
    }
}
