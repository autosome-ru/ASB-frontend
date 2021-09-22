import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter,
    Input,
    OnInit, Output, TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ScriptService} from 'src/app/services/script.service';
import {
    AnnotationDataModel,
    AsbStatsDataModel,
    BackgroundSelect,
    StatsDataModel
} from 'src/app/models/annotation.model';
import {writeScientificNum} from '../../../../functions/scientific.helper';
import {ToastrService} from "ngx-toastr";
import {getTextByStepNameAnanas} from "../../../../helpers/text-helpers/tour.ananas.helper";
import {stringOrNumberConverter} from "../../../../helpers/helper/check-functions.helper";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../../models/table.model";
import {convertBackgroundChoicesHelper} from "../../../../helpers/text-helpers/convertBackgroundChoices.helper";

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

    @Output()
    private statsLastStep = new EventEmitter<void>()

    public chartDatasets: Array<any> = [];
    public stats: StatsDataModel;
    public columnModel: AsbTableColumnModel<AsbStatsDataModel>;
    public displayedColumns: AsbTableDisplayedColumns<AsbStatsDataModel> = [
        "name",
        "asbsRs",
        "candidatesRs",
        "odds",
        "pValue"]

    @Input()
    set chartData(value: AnnotationDataModel) {
        if (value && value.status === 'Processed') {
            this.stats = value.metaInfo;
            this.chartDatasets = [
                {
                    data:
                        [
                            value.metaInfo.asbCount,
                            value.metaInfo.candidatesCount,
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
    public chartLoaded: boolean;
    public panelExpanded: boolean = false;

    constructor(private scriptService: ScriptService,
                private toastrService: ToastrService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.scriptService.load('charts').then(data => {
            this.chartLoaded = data.filter(v =>
                v.script === 'charts')[0].loaded;
            this.cd.detectChanges();
        }).catch(() => this.toastrService.error(
            "Can't load Chart.js library, check your internet connection", 'Error'));

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
            candidatesRs: {
                isDesc: true,
                view: '# of non-ASB SNPs',
                colorStyle: this.getRowColor,
            },
            pValue: {
                view: 'P-value',
                columnTemplate: this.fdrViewTemplate,
                colorStyle: this.getRowColor,
            },
            // fdr: {
            //     view: 'FDR',
            //     columnTemplate: this.fdrViewTemplate
            // }
        }
    }


    writeScientificNum(num, precision): string {
        return writeScientificNum(num, precision);
    }


    public chartClicked(): void {
    }

    public chartHovered(): void {
    }

    getTextByStepName(text: string) {
        return getTextByStepNameAnanas(text)
    }
    valueToView(value: string | number, precision: number = 2): string {
        return stringOrNumberConverter(value, precision)
    }

    getRowColor(p: AsbStatsDataModel): {background?: string, color?: string} {
        return p.asbsRs === 0 ? {background: '#F9F9F9', color: '#A0A0A0'} : {}
    };

    statsNextStep() {
        this.statsLastStep.emit()
    }

}
