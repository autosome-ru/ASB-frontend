import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ChartDataModel} from "../../../../models/chart-data.model";
import {ChartOptions} from "chart.js";

@Component({
    selector: 'asb-odds-bar',
    templateUrl: './odds-bar.component.html',
    styleUrls: ['./odds-bar.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OddsBarComponent implements OnInit {

    @Input()
    public chartData: ChartDataModel
    public chartDatasets: { data: number[]; label: string }[];
    public chartLabels: string[];
    public chartOptions: ChartOptions;
    public chartColors: Array<any>;


    constructor() { }

    ngOnInit(): void {
        this.chartLabels = this.chartData.labels
        this.chartColors = [
            {
                backgroundColor: this.chartData.obsColors,
                borderWidth: 2,
            },
            {
                backgroundColor: this.chartData.expColors,
                borderWidth: 2,
            }
        ];
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
                position: 'bottom'
            },
            layout: {
                padding: {
                    bottom: 20
                }
            },
            scales : {
                xAxes: [{
                    ticks: {
                        min : 0,
                    }
                }]

            },
            tooltips: {
                custom: item => {
                    if (item.body) {
                        item.body = item.body.map((line, index) => {
                            if (line) {
                                return {
                                    ...line,
                                    lines: [this.chartData.pointLabels[item.dataPoints[0].index][index]]
                                }
                            }
                            return null

                        });
                        if (this.chartData.FDRs) {
                            item.footer = [this.chartData.FDRs[item.dataPoints[0].index]]
                        }
                        item.height = 75
                    }
                    return item
                },
            }
        }
        this.chartDatasets = [
            {
                data: this.chartData.observed,
                label: 'Observed',
            },
            {
                data: this.chartData.expected,
                label: 'Expected'
            }
        ]
    }

}
