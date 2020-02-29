import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ExpSnpModel} from "../../../models/data.model";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../models/table.model";
import {getPaginatorOptions} from "../../../helpers/check-functions.helper";

@Component({
    selector: 'asb-inner-table',
    templateUrl: './inner-table.component.html',
    styleUrls: ['./inner-table.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerTableComponent implements OnInit {
    @ViewChild("alignViewTemplate", {static: true})
    public alignViewTemplate: TemplateRef<{value: number}>;

    constructor() { }

    public columnModel: AsbTableColumnModel<ExpSnpModel> = {
        bad: {view: "Bad", valueConverter: v => v},
        refReadCount: {view: "Ref read counts", valueConverter: v => "" + v},
        altReadCount: {view: "Alt read counts", valueConverter: v => "" + v},
        align: {view: "GTRD align", template: this.alignViewTemplate},
        clName: {view: "Cell line name", valueConverter: v => "" + v},
        tfName: {view: "Transcription factor name", valueConverter: v => "" + v},
    };
    public displayedColumns: AsbTableDisplayedColumns<ExpSnpModel> = [
        "refReadCount",
        "altReadCount",
        "align",
        "clName",
        "tfName",
        "bad",
    ];

    @Input()
    public innerTableData: ExpSnpModel[];

    ngOnInit(): void {
    }

    _getPaginatorOptions(): number[] {
        return getPaginatorOptions(this.innerTableData.length)
    }
}
