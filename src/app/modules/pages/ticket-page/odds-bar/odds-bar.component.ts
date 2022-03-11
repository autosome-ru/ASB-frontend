import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ChartDataModel} from "../../../../models/chart-data.model";

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
    public chartOptions: any;
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
            scales : {
                xAxes: [{
                    ticks: {
                        min : 0,
                        max: 1
                    }
                }]

            },
            tooltips: {
                custom: item => {
                    if (item.body) {
                        item.body = item.body.map((line, index) => {
                            if (line) {
                                return {...line, lines:
                                        [this.chartData.pointLabels[item.dataPoints[0].index][index]]}
                            }
                            return null

                        });
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
