import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input,
    OnInit,
    Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';
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


    public chartDatasets: Array<any> = [];
    public chartLabels: Array<any> = [];
    private lastHovered: number;

    @Input()
    public chartLoaded: boolean;

    @Input()
    data: CountModel[]

    @Input()
    public isExpanded: boolean

    @Input()
    public tfOrCl: TfOrCl
    private expectedTotalCount: number;

    @Input()
    set selectedIndex(value: number) {
        const backgroundColor1 = [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
            'rgba(185, 185, 185)'
        ];
        const backgroundColor2 = [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(185, 185, 185, 0.7)'
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
        this.chartColors = backgroundColor1.map(
            (s, i) => {
                return {
                    backgroundColor: i === value || value === null ?
                        [backgroundColor2[i], s] : backgroundOpacityColor[i]
                }
            }
        );
    }

    @Output()
    private chartClickEmitter = new EventEmitter<any>()

    constructor() {
    }

    public chartColors: any[] = [];
    public chartOptions: ChartOptions;

    ngOnInit(): void {
        this.chartLabels = ['Expected fraction', 'Observed count'];
        this.expectedTotalCount = this.data.reduce((a, b) => a + b.expCount, 0)

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
                        max: 1
                    },
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        display: true
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
                mode: 'nearest',
                position: 'nearest',
                titleFontSize: 0,
                callbacks: {
                    label: (tooltipItem, data) => {
                        let label = (tooltipItem.index == 0 ?
                            (this.data[tooltipItem.datasetIndex].expCount / this.expectedTotalCount).toFixed(2) :
                            this.data[tooltipItem.datasetIndex].count) || '' ;
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
        const sumCounts = this.data.reduce(
            (s, pr) => s + pr.count, 0)
        const expCounts = this.data.reduce(
            (s, pr) => s + pr.expCount, 0)
        this.chartDatasets = this.data.map(
            (s) => {
                return {
                    data: [s.expCount/expCounts,
                        s.count/sumCounts],
                    label: s.name,
                    barThickness: [15, 35]
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
