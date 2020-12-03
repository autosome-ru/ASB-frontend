import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AsbStatsDataModel} from "../../../../models/annotation.model";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../../models/table.model";

@Component({
  selector: 'asb-ticket-table-tmp',
  templateUrl: './ticket-table-tmp.component.html',
  styleUrls: ['./ticket-table-tmp.component.less']
})
export class TicketTableTmpComponent implements OnInit {
    @ViewChild('fdrViewTemplate', {static: true})
    private fdrViewTemplate: TemplateRef<{ value: number }>;

  @Input()
  public data: AsbStatsDataModel[]

    public columnModel: AsbTableColumnModel<AsbStatsDataModel>
    public displayedColumns: AsbTableDisplayedColumns<AsbStatsDataModel>;
    constructor() { }
  ngOnInit(): void {
      this.columnModel = {
          name: {
              view: 'Name',
          },
          odds: {
              view: 'Odds',
              valueConverter: v => v.toFixed(2)
          },
          log10_p_value: {
              view: 'Raw P-value',
              columnTemplate: this.fdrViewTemplate
          },
          log10_fdr: {
              view: 'FDR',
              columnTemplate: this.fdrViewTemplate
          }
      }
      this.displayedColumns = ["name", "odds", "log10_p_value", "log10_fdr"]

  }

}
