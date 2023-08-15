import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input,
    OnInit, Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {AsbStatsDataModel} from "../../../../models/annotation.model";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../../models/table.model";
import {stringOrNumberConverter} from "../../../../helpers/helper/check-functions.helper";
import {getChartData} from "../../../../helpers/helper/apply-functions.helper";
import {ChartDataModel} from "../../../../models/chart-data.model";
import {getTextByStepNameAnanas} from "../../../../helpers/text-helpers/tour.ananas.helper";

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

    @Input()
    public stepId: string = 'tmp';

    @Output()
    private statsLastStep = new EventEmitter<void>()

    public columnModel: AsbTableColumnModel<AsbStatsDataModel>
    public displayedColumns: AsbTableDisplayedColumns<AsbStatsDataModel>;
    public defaultDisplayedColumns: AsbTableDisplayedColumns<AsbStatsDataModel>;
    public chartData: ChartDataModel;
    public toggleValue: 'chart' | 'table' = 'chart'
    public checked: boolean;
    public checkedChartData: ChartDataModel;
    constructor() {
    }

    ngOnInit(): void {
        this.checked = this.data.some(this.sortingAcc);
        this.checkedChartData = this.setChartData(
            this.data.filter(this.sortingAcc)
        );
        this.chartData = this.setChartData(this.data);
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
                view: '# of ASCA SNPs'
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
                view: 'Expected # of non-ASCA SNPs',
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

    setChartData(data: AsbStatsDataModel[]): ChartDataModel {
        return getChartData(data);
    }

    sortingAcc(s: AsbStatsDataModel): boolean {
        return s.fdr === 'infinity' || s.fdr <= Math.log10(0.055);
    }

    statsNextStep() {
        this.statsLastStep.emit()
    }

    getTextByStepName(text: string) {
        return getTextByStepNameAnanas(text)
    }
}
