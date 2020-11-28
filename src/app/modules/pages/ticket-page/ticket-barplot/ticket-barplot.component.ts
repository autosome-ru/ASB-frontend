import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ScriptService} from "../../../../services/script.service";
import {ToastrService} from "ngx-toastr";
import {CountModel} from "../../../../models/annotation.model";
import {TfOrCl} from "../../../../models/data.model";

@Component({
    selector: 'asb-ticket-barplot',
    templateUrl: './ticket-barplot.component.html',
    styleUrls: ['./ticket-barplot.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketBarplotComponent implements OnInit {
    public chartLoaded: boolean;
    public chartDatasets: Array<any>;
    public chartLabels: Array<any>;
    @Input()
    set data(value: CountModel[]) {
        this.chartDatasets = [
            {
                data: value.map(s => s.count),
                label: '1323'
            }
        ]
        this.chartLabels = value.map(s => s.name)
    }

    @Input()
    public tfOrCl: TfOrCl

    constructor(private scriptService: ScriptService,
                private cd: ChangeDetectorRef,
                private toastrService: ToastrService) {
    }

    public chartColors: Array<any> = [
        {
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
            ],
            borderWidth: 2,
        }
    ];
    public chartOptions: any = {
        responsive: true,
        legend: {
            display: false,
            position: 'bottom'
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem) => {
                   let label = this.chartLabels[tooltipItem.index] || '';
                   label = getShortLabel(label)
                    if (label) {
                        label += ': ';
                    }
                    label += this.chartDatasets[0].data[tooltipItem.index];
                    return label;
                }
            }
        }
    };

    ngOnInit(): void {
        this.scriptService.load('charts').then(data => {
            this.chartLoaded = data.filter(v => v.script === 'charts')[0].loaded;
            this.cd.detectChanges();
        }).catch(() => this.toastrService.error(
            "Can't load Chart.js library, check your internet connection", 'Error'));
    }

    chartHovered($event: any) {
        console.log($event)
    }
}

function getShortLabel(label: string): string {
    if (label.includes('(')) {
        return label.split('(')[0].trim()
    }
    return label.trim()
}
