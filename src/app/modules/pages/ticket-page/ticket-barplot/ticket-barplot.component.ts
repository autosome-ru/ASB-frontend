import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ScriptService} from "../../../../services/script.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'asb-ticket-barplot',
    templateUrl: './ticket-barplot.component.html',
    styleUrls: ['./ticket-barplot.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketBarplotComponent implements OnInit {
    public chartLoaded: boolean;

    constructor(private scriptService: ScriptService,
                private cd: ChangeDetectorRef,
                private toastrService: ToastrService) {
    }
    public chartDatasets: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
    ];

    public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

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
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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
