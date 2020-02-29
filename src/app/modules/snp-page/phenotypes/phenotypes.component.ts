import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {SnpInfoModel} from "../../../models/data.model";

@Component({
    selector: 'asb-phenotypes',
    templateUrl: './phenotypes.component.html',
    styleUrls: ['./phenotypes.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhenotypesComponent implements OnInit {

    @Input()
    public snpData: SnpInfoModel;
    public phenotypesDb: string[] = ['grasp', 'ebi', 'clinvar', 'phewas', 'finemapping', 'QTL'];
    constructor() { }

    ngOnInit(): void {
        this.phenotypesDb = Object.keys(this.snpData.phenotypes)
    }

}
