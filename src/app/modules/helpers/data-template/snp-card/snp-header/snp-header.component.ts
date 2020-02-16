import {Component, Input, OnInit,} from '@angular/core';
import {SnpInfoModel} from "src/app/models/data.model";

@Component({
    selector: 'asb-snp-header',
    templateUrl: './snp-header.component.html',
    styleUrls: ['../snp-card.component.less']
})
export class AsbSnpHeaderComponent implements OnInit {

    @Input()
    public data: SnpInfoModel;
    @Input()
    public snpCard: boolean = true;

    constructor() {}
    ngOnInit() {

    }
}
