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
        this.chartDatasets = [{data: value.map(s => s.count), label: '1323' }]
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
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderWidth: 2,
        }
    ];

    ngOnInit(): void {
        this.scriptService.load('charts').then(data => {
            this.chartLoaded = data.filter(v => v.script === 'charts')[0].loaded;
            this.cd.detectChanges();
        }).catch(() => this.toastrService.error(
            "Can't load Chart.js library, check your internet connection", 'Error'));
    }

}
