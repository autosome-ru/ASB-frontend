import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter,
    Input,
    OnInit,
    Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ScriptService} from "../../../../services/script.service";
import {ToastrService} from "ngx-toastr";
import {CountModel} from "../../../../models/annotation.model";
import {TfOrCl} from "../../../../models/data.model";
import {ChartOptions} from "chart.js";
import {BaseChartDirective} from "angular-bootstrap-md";

@Component({
    selector: 'asb-ticket-barplot',
    templateUrl: './ticket-barplot.component.html',
    styleUrls: ['./ticket-barplot.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketBarplotComponent implements OnInit {
    @ViewChild(BaseChartDirective)
    chartDirective: BaseChartDirective;
    public chartLoaded: boolean;
    public chartDatasets: Array<any> =[];
    public chartLabels: Array<any> = [];
    private lastHovered: number;
    @Input()
    data: CountModel[]

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
        this.chartColors = backgroundColor.map(
            (s, i) => {
                return {
                    backgroundColor: i=== value || value === null ? s : backgroundOpacityColor[i]
                }
            }
        );
    }

    @Output()
    private chartClickEmitter = new EventEmitter<any>()

    constructor(private scriptService: ScriptService,
                private cd: ChangeDetectorRef,
                private toastrService: ToastrService) {
    }

    public chartColors: any[] = [];
    public chartOptions: ChartOptions;

    ngOnInit(): void {
        this.chartLabels = this.tfOrCl == 'tf' ? ['TFs'] : ['Cell types']
        this.scriptService.load('charts').then(data => {
            this.chartLoaded = data.filter(v => v.script === 'charts')[0].loaded;
            this.cd.detectChanges();
        }).catch(() => this.toastrService.error(
            "Can't load Chart.js library, check your internet connection", 'Error')
        );
        console.log()

        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                fontSize: 16,
                fontColor: 'rgba(0, 0, 0, 0.87)',
                fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
                text: `List of allele-specific binding events`
            },
            layout: {
              padding: {
                  left: 2,
                  right: 10
              }
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        display: false,
                        max: this.data.reduce((s, b) => s + b.count, 0)
                    },
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        display: false
                    },
                    gridLines: {
                        display: false,
                    },
                }]
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
                mode: 'point',
                position: 'nearest',
                titleFontSize: 0,
                callbacks: {
                    label: (tooltipItem, data) => {
                        let label = data.datasets[tooltipItem.datasetIndex].data[0] || '';
                        label = getShortLabel(`${label}`)
                        if (label) {
                            label += ': ';
                        }
                        label += data.datasets[tooltipItem.datasetIndex].label;
                        this.lastHovered = tooltipItem.datasetIndex
                        return label;
                    }
                }
            }
        };
        this.chartDatasets = this.data.map(
            (s) => {
                return {
                    data: [s.count],
                    label: s.name
                }
            }
        );

    }

    chartClicked(event) {
        if (this.chartDirective.getPointDataAtEvent(event)) {
            this.chartClickEmitter.emit(this.lastHovered)
        }
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
