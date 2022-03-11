import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input,
    OnInit, Output, TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {
    AnnotationDataModel,
    AsbStatsDataModel, pValueString,
    StatsDataModel
} from 'src/app/models/annotation.model';
import {getTextByStepNameAnanas} from "../../../../helpers/text-helpers/tour.ananas.helper";
import {stringOrNumberConverter} from "../../../../helpers/helper/check-functions.helper";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../../models/table.model";
import {ChartDataModel} from "../../../../models/chart-data.model";
import {getChartData} from "../../../../helpers/helper/apply-functions.helper";


@Component({
    selector: 'astra-ticket-stats',
    templateUrl: './ticket-stats.component.html',
    styleUrls: ['./ticket-stats.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TicketStatsComponent implements OnInit {
    @ViewChild('fdrViewTemplate', {static: true})
    private fdrViewTemplate: TemplateRef<{ value: number }>;
    @Input()
    chrPanelOpened: boolean = false;

    @Input()
    public chartLoaded: boolean;

    @Output()
    private statsLastStep = new EventEmitter<void>()

    public chartDatasets: Array<any> = [];
    public stats: StatsDataModel;
    public columnModel: AsbTableColumnModel<AsbStatsDataModel>;
    public defaultDisplayedColumns: AsbTableDisplayedColumns<AsbStatsDataModel> = [
        "name",
        "asbsRs",
        "negativesRs",
        "odds",
        "pValue"]
    public displayedColumns: AsbTableDisplayedColumns<AsbStatsDataModel> = [];

    @Input()
    set chartData(value: AnnotationDataModel) {
        if (value && value.status === 'Processed') {
            this.stats = value.metaInfo;
            this.chartDatasets = [
                {
                    data:
                        [
                            value.metaInfo.asbCount,
                            value.metaInfo.negativesCount,
                            value.metaInfo.undefinedCount,
                            value.metaInfo.notFound
                        ],
                    label: 'All ASB'
                }
            ];
        }
    }

    public chartLabels: string[] = ['ASB SNPs', 'Non-ASB SNPs', 'Undefined ASBs', 'N/A'];

    public chartColors: Array<any> = [
        {
            backgroundColor: ['#06cd99', '#f8c80b', '#808080', '#B8B8B8'],
            hoverBackgroundColor: ['#06dca3', '#f9ce24', '#868686', '#BEBEBE'],
            borderWidth: 2,
        }
    ];

    public chartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
            position: 'bottom'
        }
    };

    constructor() {
    }

    ngOnInit(): void {
        this.columnModel = {
            name: {
                view: 'Chromosome',
                colorStyle: this.getRowColor,
            },
            odds: {
                view: 'Odds ratio',
                valueConverter: v => stringOrNumberConverter(v),
                colorStyle: this.getRowColor,
                isDesc: true
            },
            asbsRs: {
                isDesc: true,
                view: '# of ASB SNPs',
                colorStyle: this.getRowColor,
            },
            negativesRs: {
                isDesc: true,
                view: '# of non-ASB SNPs',
                colorStyle: this.getRowColor,
            },
            pValue: {
                view: 'P-value',
                columnTemplate: this.fdrViewTemplate,
                colorStyle: this.getRowColor,
            },
            expectedNegativesRs: {
                view: 'Expected # of non-ASB SNPs',
                isDesc: true,
                colorStyle: this.getRowColor,
            },
            expectedAsbsRs: {
                view: 'Expected # of ASB SNPs',
                isDesc: true,
                colorStyle: this.getRowColor,
            },
        }
        this.displayedColumns = [
            "name",
            "asbsRs",
            "negativesRs",
            "expectedAsbsRs",
            "expectedNegativesRs",
            "odds",
            "pValue"
        ]
    }

    public chartClicked(): void {
    }

    public chartHovered(): void {
    }

    getTextByStepName(text: string) {
        return getTextByStepNameAnanas(text)
    }
    valueToView(value: pValueString, precision: number = 2): string {
        return stringOrNumberConverter(value, precision)
    }

    getRowColor(p: AsbStatsDataModel): {background?: string, color?: string} {
        return p.asbsRs === 0 ? {background: '#F9F9F9', color: '#A0A0A0'} : {}
    };

    statsNextStep() {
        this.statsLastStep.emit()
    }

    getChartData(chrAsbData: AsbStatsDataModel[]): ChartDataModel {
        return getChartData(chrAsbData);
    }
}
