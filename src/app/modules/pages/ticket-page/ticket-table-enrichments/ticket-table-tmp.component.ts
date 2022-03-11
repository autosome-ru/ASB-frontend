import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {AsbStatsDataModel} from "../../../../models/annotation.model";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../../models/table.model";
import {stringOrNumberConverter} from "../../../../helpers/helper/check-functions.helper";
import {getChartData} from "../../../../helpers/helper/apply-functions.helper";
import {ChartDataModel} from "../../../../models/chart-data.model";

@Component({
    selector: 'asb-ticket-table-tmp',
    templateUrl: './ticket-table-tmp.component.html',
    styleUrls: ['./ticket-table-tmp.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TicketTableTmpComponent implements OnInit {
    @ViewChild('fdrViewTemplate', {static: true})
    private fdrViewTemplate: TemplateRef<{ value: number }>;

    @Input()
    public data: AsbStatsDataModel[]

    @Input()
    public chartsLoaded: boolean;
    public columnModel: AsbTableColumnModel<AsbStatsDataModel>
    public displayedColumns: AsbTableDisplayedColumns<AsbStatsDataModel>;
    public defaultDisplayedColumns: AsbTableDisplayedColumns<AsbStatsDataModel>;
    public chartData: ChartDataModel;

    constructor() {
    }

    ngOnInit(): void {
        this.chartData = getChartData(this.data)
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
                isDesc: true,
                view: '# of ASB SNPs'
            },
            pValue: {
                view: 'P-value',
                columnTemplate: this.fdrViewTemplate
            },
            fdr: {
                view: 'FDR',
                columnTemplate: this.fdrViewTemplate
            },
            expectedNegativesRs: {
                view: 'Expected # of non-ASB SNPs',
                isDesc: true
            },
            expectedAsbsRs: {
                view: 'Expected # of ASB SNPs',
                isDesc: true
            },
            negativesRs: {
                view: '# of non-ASB SNPs',
                isDesc: true
            }
        }
        this.defaultDisplayedColumns = ["name", "asbsRs", "odds", "pValue", "fdr"]
        this.displayedColumns = [
            "name", "asbsRs", "negativesRs",
            "expectedAsbsRs", "expectedNegativesRs",
            "odds", "pValue", "fdr"
        ]

    }
}
