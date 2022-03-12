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
    }

    public chartClicked(): void {
    }

    public chartHovered(): void {
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

    getTextByStepName(text: string) {
        return getTextByStepNameAnanas(text)
    }
}
