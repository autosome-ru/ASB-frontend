import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ScriptService} from 'src/app/services/script.service';
import {AnnotationDataModel, StatsDataModel} from 'src/app/models/annotation.model';
import {writeScientificNum} from '../../../../functions/scientific.helper';
import {ToastrService} from "ngx-toastr";

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
        {data:
            [value.metaInfo.notFound, value.metaInfo.asbCount, value.metaInfo.candidatesCount],
          label: 'All ASB'}
        ];
    }
  }

  public chartLabels: string[] = ['Unknown', 'ASB SNPs', 'Non-ASB SNPs'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#B8B8B8', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#BEBEBE', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    legend: {
      display: true,
      position: 'bottom'
    }
  };
  public chartLoaded: boolean;

  constructor(private scriptService: ScriptService,
              private toastrService: ToastrService,
              private cd: ChangeDetectorRef) { }

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


  public chartClicked(): void { }
  public chartHovered(): void { }
}
