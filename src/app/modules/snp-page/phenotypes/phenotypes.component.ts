import {Component, Input, OnInit} from '@angular/core';
import {SnpInfoModel} from "../../../models/data.model";

@Component({
    selector: 'asb-phenotypes',
    templateUrl: './phenotypes.component.html',
    styleUrls: ['./phenotypes.component.less']
})
export class PhenotypesComponent implements OnInit {

    @Input()
    public snpData: SnpInfoModel;
    constructor() { }

    ngOnInit(): void {
    }

}
