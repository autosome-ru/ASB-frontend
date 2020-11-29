import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {AsbTableColumnModel, AsbTableDisplayedColumns} from '../../../../models/table.model';
import {AnnotationDataModel, AnnotationSnpModel, CountModel} from 'src/app/models/annotation.model';
import {TfOrCl} from '../../../../models/data.model';
import {MatSelectChange} from '@angular/material/select';
import {FormBuilder, FormControl} from '@angular/forms';
import {MatButtonToggleChange} from '@angular/material/button-toggle';


@Component({
    selector: 'astra-ticket-table-preview',
    templateUrl: './ticket-table-preview.component.html',
    styleUrls: ['./ticket-table-preview.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketTablePreviewComponent implements OnInit {
    @ViewChild("genomePositionViewTemplate", {static: true})
    private genomePositionViewTemplate: TemplateRef<{ row: AnnotationSnpModel, value: string}>;

    @ViewChild("genomePositionViewSumTemplate", {static: true})
    private genomePositionViewSumTemplate: TemplateRef<{ row: AnnotationSnpModel, value: string}>;

    @ViewChild('downloadSelectType')
    private downloadSelectTemplate: TemplateRef<any>;
    @ViewChild('fdrViewTemplate', {static: true})
    private fdrViewTemplate: TemplateRef<{ value: number }>;
    @ViewChild('dbSnpViewTemplate', {static: true})
    private dbSnpViewTemplate: TemplateRef<{ value: string }>;
    @Input()
    public data: AnnotationSnpModel[] = [];

    @Input()
    public ticketStatistics: AnnotationDataModel;

    @Input()
    public tfOrCl: TfOrCl;

    @Input()
    public isExpanded = false;

    @Output()
    private groupValueEmitter = new EventEmitter<boolean>();

    @Output()
    private downloadTableEmitter = new EventEmitter<void>();

    @Input()
    public selectedName: string;

    @Output()
    private selectedNameChange = new EventEmitter<string>();

    public displayedColumns: AsbTableDisplayedColumns<AnnotationSnpModel>;
    public columnModel: AsbTableColumnModel<AnnotationSnpModel>;
    public columnsControl: FormControl;
    public tableData: AnnotationSnpModel[];
    public colors: { [base: string]: string } = {
        A: "#0074FF",
        T: "#7900C8",
        G: "#FF4500",
        C: "#FFA500"
    };
    private initialDisplayedColumns: AsbTableDisplayedColumns<AnnotationSnpModel>;


    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.displayedColumns = ['rsId', 'chr'];
        this.columnModel = {
            rsId: {view: 'rs ID', columnTemplate: this.dbSnpViewTemplate},
            chr: {
                view: "Genome position",
                columnTemplate: this.isExpanded ? this.genomePositionViewTemplate : this.genomePositionViewSumTemplate,
                disabledSort: true
            },
            context: {
                view: 'Sequence',
                disabledSort: true
            }
        };
        if (this.tfOrCl === 'tf') {
            this.displayedColumns.push('transcriptionFactor')
            if (this.isExpanded) {
                this.columnModel.transcriptionFactor = {view: 'Transcription factor'};
            } else {
                this.columnModel.transcriptionFactor = {view: 'Top transcription factor', helpMessage: 'By ASB significance'};
            }
        } else {
            this.displayedColumns.push('cellType')
            if (this.isExpanded) {
                this.columnModel.cellType = {view: 'Cell type'};
            } else {
                this.columnModel.cellType = {view: 'Top cell type', helpMessage: 'By ASB significance'};
            }
        }
        this.displayedColumns.push('fdrRef', 'fdrAlt');
        this.columnModel.fdrRef = {
                view: (this.isExpanded ? '' : 'Best ') + 'FDR Ref',
                columnTemplate: this.fdrViewTemplate
            }
        this.columnModel.fdrAlt = {
                view: (this.isExpanded ? '' : 'Best ') + 'FDR Alt',
                columnTemplate: this.fdrViewTemplate
            };
        if (!this.isExpanded) {
            this.columnModel.tfBindPref = {
                view: 'TF binding preferences'
            }
            this.displayedColumns.push('tfBindPref');
            this.columnModel.isEqtl = {
                view: 'Is eQTL',
                valueConverter: v => v ? 'Yes' : 'No'
            };
            this.columnModel.targetGenes = {
                view: 'GTEx eQTL target genes'
            }
        } else {
            if (this.tfOrCl === 'tf') {
                this.columnModel = {
                    ...this.columnModel,
                    motifFc: {
                        view: "Motif fold change",
                        valueConverter: v => v !== null ? v.toFixed(2) : "n/a",
                        helpMessage: 'log₂(Alt/Ref motif p-value)',
                        isDesc: true
                    },
                    motifPRef: {
                        view: "Motif Ref P-value",
                            columnTemplate: this.fdrViewTemplate,
                    },
                    motifPAlt: {
                        view: "Motif Alt P-value",
                            columnTemplate: this.fdrViewTemplate,
                    },
                    motifOrientation: {
                        view: 'Motif orientation',
                            valueConverter: v => v !== null ? v ? '+' : '-' : "n/a",
                    },
                    motifConcordance: {
                        view: "Motif concordance",
                            valueConverter: v => v !== null ? v : "n/a",
                            isDesc: true
                    },
                    motifPosition: {
                        view: "Motif position",
                            valueConverter: v => v !== null ? '' + v : "n/a",
                            helpMessage: 'SNP position relative to the TF motif (1-based)'
                    },
                }
            }
        }
        this.columnsControl = this.formBuilder.control(this.displayedColumns);
        this.initialDisplayedColumns = this.displayedColumns;
        this.filterTable(this.selectedName)

    }

    _resetFilters(): void {
        this.displayedColumns = this.initialDisplayedColumns;
        this.columnsControl.patchValue(this.initialDisplayedColumns);
    }

    _changeColumns(event: MatSelectChange): void {
        this.displayedColumns = [
            ...event.value
        ];
    }

    _groupToggled(event: MatButtonToggleChange): void {
        this.isExpanded = event.value;
        this.groupValueEmitter.emit(this.isExpanded);
    }

    // chooseFormat(format: string): void {
    // }

    downloadTable(): void {
        this.downloadTableEmitter.emit();
    }
    chartClicked(name: {event: MouseEvent, active: {_index: number}[]}) {
        if (name.active && name.active.length > 0) {
            if (this.tfOrCl == 'tf') {
                const tf: CountModel = this.ticketStatistics.metaInfo.tfAsbList[name.active[0]._index]
                this.filterTable(tf.name)
            } else {
                const cl: CountModel = this.ticketStatistics.metaInfo.clAsbList[name.active[0]._index]
                this.filterTable(cl.name)
            }
        }
    }
    filterTable(name?: string) {
        this.selectedNameChange.emit(name)
        if (name) {
            this.tableData = this.data.filter(s => this.filterFunction(s, name))
        } else {

            this.tableData = this.data
        }
    }
    filterFunction(snp: AnnotationSnpModel, name: string): boolean {
        const snpField: string = this.tfOrCl === 'tf' ? snp.transcriptionFactor : snp.cellType;
        if (name === 'Other') {
            const objList: CountModel[] = this.tfOrCl === 'tf' ? this.ticketStatistics.metaInfo.tfAsbList : this.ticketStatistics.metaInfo.clAsbList
            return objList.every(s => snpField !== s.name)
        } else {
            return snpField === name
        }

    }
}
