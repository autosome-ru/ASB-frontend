import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input, OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {AsbServerSideModel, AsbTableColumnModel, AsbTableDisplayedColumns} from '../../../../models/table.model';
import {
    AnnotationDataModel,
    AnnotationSnpModel,
    AsbStatsDataModel,
    CountModel,
    StatsDataModel
} from 'src/app/models/annotation.model';
import {ExpSnpModel, TfOrCl} from '../../../../models/data.model';
import {MatSelectChange} from '@angular/material/select';
import {FormBuilder, FormControl} from '@angular/forms';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {MatSort} from "@angular/material/sort";
import {compareData} from "../../../../helpers/helper/check-functions.helper";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {getTextByStepNameAnanas} from "../../../../helpers/text-helpers/tour.ananas.helper";
import {ReleaseModel} from "../../../../models/releases.model";
import {ananastraRelease} from "../../../../helpers/constants/releases";
import {DataService} from "../../../../services/data.service";


@Component({
    selector: 'astra-ticket-table-preview',
    templateUrl: './ticket-table-preview.component.html',
    styleUrls: ['./ticket-table-preview.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketTablePreviewComponent implements OnInit, OnDestroy {
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

    @ViewChild('gtexTemplate', {static: true})
    private gtexTemplate: TemplateRef<{ value: boolean, row: AnnotationSnpModel }>;

    @ViewChild('prefAlleleColumnTemplate', {static: true})
    private prefAlleleColumnTemplate: TemplateRef<{ value: string }>;

    @ViewChild('concordanceTemplate', {static: true})
    private concordanceTemplate: TemplateRef<{ value: string}>;

    @ViewChild('imagePopupTemplate', {static: true})
    private imagePopupTemplate: TemplateRef<{ value: string}>;

    @ViewChild('uscsColumnTemplate', {static: true})
    private uscsColumnTemplate: TemplateRef<{row: AnnotationSnpModel, value: number}>

    @ViewChild('tfBindPrefTemplate', {static: true})
    private tfBindPrefTemplate: TemplateRef<{ value: string }>;

    @ViewChild('tfViewTemplate', {static: true})
    private tfViewTemplate: TemplateRef<{value: string}>;

    @ViewChild('clViewTemplate', {static: true})
    private clViewTemplate: TemplateRef<{value: string}>;

    @Input()
    public data: Observable<AnnotationSnpModel[]>;

    @Input()
    public dataLoading: boolean;

    @Input()
    public ticketStatistics: AnnotationDataModel;

    @Input()
    public selectedName: string;

    @Input()
    public tfOrCl: TfOrCl;

    @Input()
    public panelExpanded: boolean = false;

    @Input()
    public isExpanded = false;

    @Input()
    public paginatorLength: number;

    @Input()
    public chartsLoaded: boolean;

    @Output()
    private groupValueEmitter = new EventEmitter<boolean>();

    @Output()
    private downloadTableEmitter = new EventEmitter<void>();

    @Output()
    private panelExpandedChange = new EventEmitter<boolean>();

    @Output()
    private selectedNameChange = new EventEmitter<string>();

    @Output()
    private tableChangesEmitter = new EventEmitter<AsbServerSideModel>();

    public displayedColumns: AsbTableDisplayedColumns<AnnotationSnpModel>;
    private subscriptions = new Subscription();
    public rowsLimit = 500;
    public tableOpened: boolean;
    public release: ReleaseModel = ananastraRelease;
    public columnModel: AsbTableColumnModel<AnnotationSnpModel>;
    sortData: (data: AnnotationSnpModel[], field: MatSort) => AnnotationSnpModel[] =
        (data, field) => {
        if (field.active === 'chr') {
            const chrToNum = (chr: string) => Number(chr.slice(3))
            function compareAnnSnpModel(a: AnnotationSnpModel, b: AnnotationSnpModel) {
                if (chrToNum(a.genomePosition) > chrToNum(b.genomePosition)) {
                    return 1
                } else {
                    if (chrToNum(a.genomePosition) == chrToNum(b.genomePosition)) {
                        return a.pos > b.pos ? 1 : -1
                    }
                    return -1
                }

            }
            return data.sort((a, b) =>
                compareAnnSnpModel(a, b) * (field.direction === 'asc' ? 1 : -1))
        } else {
            return data.sort((a,b) =>
                compareData(a as any, b as any, field))
        }
    }
    public columnsControl: FormControl;
    public tableData: Observable<AnnotationSnpModel[]>;
    public colors: { [base: string]: string } = {
        A: "#0074FF",
        T: "#7900C8",
        G: "#FF4500",
        C: "#FFA500"
    };
    private initialDisplayedColumns: AsbTableDisplayedColumns<AnnotationSnpModel>;
    private dialog: MatDialogRef<{ value: string }>;
    public revcompState: boolean = false;
    public innerTableLoading$ = new BehaviorSubject<boolean>(false);
    public innerTableData: ExpSnpModel[];


    constructor(private formBuilder: FormBuilder,
                private dataService: DataService,
                private matDialog: MatDialog) {
    }

    ngOnInit(): void {

        this.displayedColumns = ['rsId', 'genomePosition', 'pos'];
        this.columnModel = {
            rsId: {view: 'rs ID', columnTemplate: this.dbSnpViewTemplate},
            genomePosition: {
                view: "Genome position",
                columnTemplate: this.isExpanded ? this.genomePositionViewTemplate : this.genomePositionViewSumTemplate,
            },
            context: {
                view: 'Sequence',
                disabledSort: true
            },
            pos: {
                view: 'UCSC',
                disabledSort: true,
                columnTemplate: this.uscsColumnTemplate
            }
        };
        if (this.tfOrCl === 'tf') {
            this.displayedColumns.push('transcriptionFactor')
            if (this.isExpanded) {
                this.columnModel.transcriptionFactor = {
                    view: 'Transcription factor',
                    columnTemplate: this.tfViewTemplate
                };
            } else {
                this.columnModel.transcriptionFactor = {
                    view: 'Top transcription factor',
                    helpMessage: 'By ASB significance',
                    columnTemplate: this.tfViewTemplate
                };
            }
        } else {
            this.displayedColumns.push('cellType')
            if (this.isExpanded) {
                this.columnModel.cellType = {
                    view: 'Cell type',
                    columnTemplate: this.clViewTemplate
                };

            } else {
                this.columnModel.cellType = {
                    view: 'Top cell type',
                    helpMessage: 'By ASB significance',
                    columnTemplate: this.clViewTemplate
                };
            }
        }

        if (!this.isExpanded) {
            this.columnModel.prefAllele = {
                view: `Top ${this.tfOrCl === 'tf' ? 'TF' : 'cell type'} preferred allele`,
                columnTemplate: this.prefAlleleColumnTemplate,
                disabledSort: true
            }
            this.columnModel.topEffectSize = {
                view: `Top ${this.tfOrCl === 'tf' ? 'TF' : 'cell type'} effect size`,
                isDesc: true,
                valueConverter: v => v !== null ? v.toFixed(2) : 'n/a'
            };
            this.columnModel.log10TopFdr = {
                view: `Top ${this.tfOrCl === 'tf' ? 'TF' : 'cell type'} FDR`,
                columnTemplate: this.fdrViewTemplate
            };
            this.columnModel.tfBindingPreferences = {
                view: 'Preferably bound allele',
                columnTemplate: this.tfBindPrefTemplate
            }
            this.displayedColumns.push("topEffectSize", "log10TopFdr", 'tfBindingPreferences');

        } else {
            this.columnModel.effectSizeRef = {
                view: 'Effect size Ref',
                isDesc: true,
                valueConverter: v => v !== null ? v.toFixed(2) : 'n/a'
            };
            this.columnModel.effectSizeAlt = {
                view: 'Effect size Alt',
                isDesc: true,
                valueConverter: v => v !== null ? v.toFixed(2) : 'n/a'
            };
            this.displayedColumns.push("effectSizeRef", "effectSizeAlt", 'log10FdrRef', 'log10FdrAlt');
            this.columnModel.log10FdrRef = {
                view: 'FDR Ref',
                columnTemplate: this.fdrViewTemplate
            };
            this.columnModel.log10FdrAlt = {
                view: 'FDR Alt',
                columnTemplate: this.fdrViewTemplate
            };
            if (this.tfOrCl === 'tf') {
                this.columnModel.motifLog2Fc = {
                    view: "Motif fold change",
                        valueConverter: v => v !== null ? v.toFixed(2) : "n/a",
                        helpMessage: 'log₂(Alt/Ref motif p-value)',
                        isDesc: true
                };
                this.columnModel.motifLogPRef = {
                    view: "Motif Ref p-value",
                        columnTemplate: this.fdrViewTemplate,
                }
                this.columnModel.motifLogPAlt = {
                    view: "Motif Alt p-value",
                        columnTemplate: this.fdrViewTemplate,
                }
                this.columnModel.motifOrientation = {
                    view: 'Motif orientation',
                        valueConverter: v => v !== null ? v ? '+' : '-' : "n/a",
                }
                this.columnModel.motifConcordance = {
                    view: "Motif concordance",
                    columnTemplate: this.concordanceTemplate,
                    isDesc: true
                }
                this.displayedColumns.push("motifConcordance")
            }
        }
        this.columnModel.isEqtl = {
            view: 'GTEx eQTL',
            columnTemplate: this.gtexTemplate
        };
        this.columnModel.gtexEqtlTargetGenes = {
            view: 'GTEx eQTL target genes',
            valueConverter: v => v ? v : ''
        };
        this.columnModel.clinvar = {
            view: 'ClinVar phenotypes',
            valueConverter: v => v ? v : ''
        };
        this.columnModel.ebi = {
            view: 'EMBL-EBI phenotypes',
            valueConverter: v => v ? v : ''
        };
        this.columnModel.grasp = {
            view: 'GRASP phenotypes',
            valueConverter: v => v ? v : ''
        };
        this.columnModel.phewas = {
            view: 'PheWAS phenotypes',
            valueConverter: v => v ? v : ''
        };
        this.displayedColumns.push("isEqtl")
        this.columnsControl = this.formBuilder.control(this.displayedColumns);
        this.initialDisplayedColumns = this.displayedColumns;
        this.filterTable(this.selectedName, true)

    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
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

    downloadTable(): void {
        this.downloadTableEmitter.emit();
    }
    chartClicked(index: number) {
        if (index != null) {
            this.filterTable(this.getChartData(this.ticketStatistics.metaInfo)[index].name)
        }
    }
    filterTable(name?: string, onInit?: boolean) {
        if (!onInit) {
            if (this.selectedName !== name) {
                this.selectedNameChange.emit(name)
            } else {
                this.selectedNameChange.emit(null)
                name = null;
            }
        }
    }
    getCountModel(): CountModel[] {
        return this.getChartData(this.ticketStatistics.metaInfo);
    }

    getSelectedNameIndex(selectedName: string): number {
        return selectedName ? this.getCountModel().findIndex(
            s => s.name === selectedName
        ) : null
    }

    getChartData(metaInfo: StatsDataModel): CountModel[] {
        if (this.tfOrCl == 'tf') {
            if (this.isExpanded) {
                return metaInfo.tfAsbList
            } else {
                return metaInfo.tfAsbListSum
            }
        } else {
            if (this.isExpanded) {
                return metaInfo.clAsbList
            } else {
                return metaInfo.clAsbListSum
            }
        }
    }

    openDialog(row: AnnotationSnpModel) {
        this.dialog = this.matDialog.open(this.imagePopupTemplate, {
            autoFocus: false,
            data: row,
        })
        this.subscriptions.add(
            this.dialog.afterClosed().subscribe(
                () => this.revcompState = false
            )
        )
    }
    changeRevcompClick() {
        this.revcompState = !this.revcompState
    }

    constructAdastraLink(row: AnnotationSnpModel) {
        let result = `https://adastra.autosome.ru/snps/${row.rsId}`
        if (this.isExpanded) {
            result += '/' + row.altBase
        } else {
            result += `${row?.alleles.length != 2 ? '' : '/' + row.alleles[1]}`
        }
        return result
    }

    getLetter(value: string, row: AnnotationSnpModel): string[] {
        switch (value) {
            case 'Ref':
                return [row.alleles[0]]
            case 'Both':
                return row.alleles
            case 'Alt':
                return row.alleles.slice(1)
        }
    }

    getTextByStepName(text: string) {
        return getTextByStepNameAnanas(text)
    }

    expandedChange(state: boolean): void {
        this.panelExpandedChange.emit(state)
    }

    getTfOrClData(metaInfo: StatsDataModel): AsbStatsDataModel[] {
        return this.tfOrCl === 'tf' ? metaInfo.tfAsbData : metaInfo.clAsbData
    }

    rowClicked(row: AnnotationSnpModel) {
        if (!this.innerTableLoading$.value) {
            this.innerTableLoading$.next(true)
            this.subscriptions.add(
                this.dataService.getInnerTableInfo(
                    row.genomePosition,
                    row.pos,
                    row.altBase,
                    this.tfOrCl === 'tf' ? row.transcriptionFactor : row.cellType,
                    this.tfOrCl
                ).subscribe(
                    s => {
                        this.innerTableLoading$.next(false)
                        this.innerTableData = s
                    },
                    () => {
                        this.innerTableLoading$.next(false)
                        this.innerTableData = []
                    }
                )
            )
        }
    }
    getRowTitle(): (row) => string {
        return row => `${row.rsId} ${this.tfOrCl === 'tf' ?
                'of ' + row.transcriptionFactor : 'in ' + row.cellType}`
    }

    emitTableChanges(event: AsbServerSideModel): void {
        console.log(event)
        this.tableChangesEmitter.emit(event)
    }
}
