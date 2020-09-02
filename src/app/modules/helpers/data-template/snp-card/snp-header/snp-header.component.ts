import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {SnpInfoModel, SnpSearchModel} from "src/app/models/data.model";
import {baseToColors} from "../../../../../helpers/helper/colors.helper";
import {getTextByStepName} from "../../../../../helpers/helper/tour-text.helper";

@Component({
    selector: "asb-snp-header",
    templateUrl: "./snp-header.component.html",
    styleUrls: ["../snp-card.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
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
