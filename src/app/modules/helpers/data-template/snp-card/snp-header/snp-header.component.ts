import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClSnpModel, SnpInfoModel, TfSnpModel} from "../../../../../models/data.model";
import {OpenNewTabHelper} from "../../../../../helpers/open-new-tab.helper";

@Component({
    selector: 'asb-snp-header',
    templateUrl: './snp-header.component.html',
    styleUrls: ['../snp-card.component.less']
})
export class SnpHeaderComponent implements OnInit {

    @Input()
    public data: SnpInfoModel;
    @Input()
    public snpCard: boolean = true;

    constructor() {}
    ngOnInit() {

    }

    _goToURL(id: string) {
        OpenNewTabHelper.openNewTab("https://www.ncbi.nlm.nih.gov/snp/" + id)
    }
}
