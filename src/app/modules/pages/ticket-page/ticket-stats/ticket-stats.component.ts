import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ScriptService} from 'src/app/services/script.service';
import {AnnotationDataModel, StatsDataModel} from 'src/app/models/annotation.model';
import {writeScientificNum} from '../../../../functions/scientific.helper';
import {ToastrService} from "ngx-toastr";
import {getTextByStepNameAnanas} from "../../../../helpers/text-helpers/tour.ananas.helper";
import {stringOrNumberConverter} from "../../../../helpers/helper/check-functions.helper";

@Component({
    selector: 'astra-ticket-stats',
    templateUrl: './ticket-stats.component.html',
    styleUrls: ['./ticket-stats.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TicketStatsComponent implements OnInit {
    public chartDatasets: Array<any> = [];
    public stats: StatsDataModel;

    @Input()
    set chartData(value: AnnotationDataModel) {
        if (value && value.status === 'Processed') {
            this.stats = value.metaInfo;
            this.chartDatasets = [
                {
                    data:
                        [
                            value.metaInfo.asbCount,
                            value.metaInfo.undefinedCount,
                            value.metaInfo.candidatesCount,
                            value.metaInfo.notFound
                        ],
                    label: 'All ASB'
                }
            ];
        }
    }

    public chartLabels: string[] = [
        'ASB SNPs', 'Undefined SNPs',
        'Non-ASB SNPs', 'N/A'];

    public chartColors: Array<any> = [
        {
            backgroundColor: ['#06cd99', '#06cd69', '#f8c80b', '#B8B8B8'],
            hoverBackgroundColor: ['#06dca3', '#06dcd3', '#f9ce24', '#BEBEBE'],
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

    constructor(private scriptService: ScriptService,
                private toastrService: ToastrService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.scriptService.load('charts').then(data => {
            this.chartLoaded = data.filter(v => v.script === 'charts')[0].loaded;
            this.cd.detectChanges();
        }).catch(() => this.toastrService.error(
            "Can't load Chart.js library, check your internet connection", 'Error'));
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
}
