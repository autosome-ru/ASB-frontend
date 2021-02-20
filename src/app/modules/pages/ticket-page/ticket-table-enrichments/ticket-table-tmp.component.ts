import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AsbStatsDataModel} from "../../../../models/annotation.model";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../../models/table.model";
import {stringOrNumberConverter} from "../../../../helpers/helper/check-functions.helper";

@Component({
    selector: 'asb-ticket-table-tmp',
    templateUrl: './ticket-table-tmp.component.html',
    styleUrls: ['./ticket-table-tmp.component.less']
})
export class TicketTableTmpComponent implements OnInit {
    @ViewChild('fdrViewTemplate', {static: true})
    private fdrViewTemplate: TemplateRef<{ value: number }>;

    @Input()
    public data: AsbStatsDataModel[]

    public columnModel: AsbTableColumnModel<AsbStatsDataModel>
    public displayedColumns: AsbTableDisplayedColumns<AsbStatsDataModel>;

    constructor() {
    }

    ngOnInit(): void {
        this.columnModel = {
            name: {
                view: 'Name',
            },
            odds: {
                view: 'Odds ratio',
                valueConverter: v => stringOrNumberConverter(v),
                isDesc: true
            },
            asbsRs: {
                view: '# of ASB SNPs'
            },
            pValue: {
                view: 'P-value',
                columnTemplate: this.fdrViewTemplate
            },
            fdr: {
                view: 'FDR',
                columnTemplate: this.fdrViewTemplate
            }
        }
        this.displayedColumns = ["name", "asbsRs", "odds", "pValue", "fdr"]

    }

}
