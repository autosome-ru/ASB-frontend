import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {ScriptService} from "../../../../services/script.service";
import {ToastrService} from "ngx-toastr";
import {CountModel} from "../../../../models/annotation.model";
import {TfOrCl} from "../../../../models/data.model";
import {ChartOptions} from "chart.js";

@Component({
    selector: 'asb-ticket-barplot',
    templateUrl: './ticket-barplot.component.html',
    styleUrls: ['./ticket-barplot.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketBarplotComponent implements OnInit {
    public chartLoaded: boolean;
    public chartDatasets: Array<any> =[];
    public chartLabels: Array<any> = [];
    @Input()
    set data(value: CountModel[]) {
        this.chartDatasets = [
            {
                data: value.map(s => s.count),
                label: '123'
            }
        ]
        this.chartLabels = value.map(s => s.name)
    }

    @Input()
    public isExpanded: boolean

    @Input()
    public tfOrCl: TfOrCl

    @Input()
    set selectedIndex(value: number) {
        const backgroundColor = [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)',
                'rgba(185, 185, 185)'
            ];
        const backgroundOpacityColor = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(185, 185, 185, 0.2)'
        ];
        let bg: string[]
        if (value !== null) {
            if (value === 6) {
                bg = [
                    ...backgroundOpacityColor.slice(0, value),
                    backgroundColor[value]
                ];
            } else {
                bg = [
                    ...backgroundOpacityColor.slice(0, value),
                    backgroundColor[value],
                    ...backgroundOpacityColor.slice(value + 1),
                ];
            }

        } else {
            bg = backgroundColor;
        }

        this.chartColors = [
            {
                backgroundColor: bg,
                borderWidth: 2,
            }
        ];
    };

    @Output()
    private chartClickEmitter = new EventEmitter<any>()

    constructor(private scriptService: ScriptService,
                private cd: ChangeDetectorRef,
                private toastrService: ToastrService) {
    }

    public chartColors: any[];
    public chartOptions: ChartOptions;

    ngOnInit(): void {
        this.scriptService.load('charts').then(data => {
            this.chartLoaded = data.filter(v => v.script === 'charts')[0].loaded;
            this.cd.detectChanges();
        }).catch(() => this.toastrService.error(
            "Can't load Chart.js library, check your internet connection", 'Error'));
        this.chartOptions = {
            responsive: true,
            legend: {
                display: false,
                position: 'right'

            },
            animation: {
                duration: 500,
                onComplete: () => {
                    this.chartOptions = {
                        ...this.chartOptions,
                        animation: {
                            duration: 0
                        }
                    }
                }
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
    }

    chartClicked(event: any) {
        this.chartClickEmitter.emit(event)
    }
}

function getShortLabel(label: string): string {
    let result: string = label;
    if (result.includes('(')) {
        result = label.split('(')[0].trim()
    }
    if (result.length > 15) {
        result = result.slice(0, 12) + '...'
    }
    return result.trim()
}
