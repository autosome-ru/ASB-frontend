import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit, TemplateRef,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {ClSnpModel, SnpInfoModel, TfOrCl, TfSnpModel} from "src/app/models/data.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/reducer/adastra";
import * as fromSelectors from "src/app/store/selector/adastra";
import * as fromActions from "src/app/store/action/adastra";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../models/table.model";
import {AsbStatisticsComponent} from "./statistics/statistics.component";
import {FileSaverService} from "ngx-filesaver";
import {DataService} from "../../../services/data.service";
import {calculateColorForOne} from "../../../helpers/helper/colors.helper";
import {SeoService} from "../../../services/seo.servise";
import {ToastrService} from "ngx-toastr";
import {MatExpansionPanel} from "@angular/material/expansion";
import {AsbMotifsComponent} from "../../shared/asb-motifs/asb-motifs.component";
import {ReleasesService} from "../../../services/releases.service";
import {MatSort} from "@angular/material/sort";
import {compareData} from "../../../helpers/helper/check-functions.helper";
import {AsbPopoverComponent} from "../../shared/popover-template/popover.component";
import {getTextByStepNameAdastra} from "../../../helpers/text-helpers/tour.adastra.helper";
import {MatTabGroup} from "@angular/material/tabs";
import {ReleaseModel} from "../../../models/releases.model";

@Component({
    selector: "asb-snp-page",
    templateUrl: "./snp-page.component.html",
    styleUrls: ["./snp-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SnpPageComponent implements OnInit, OnDestroy {
    @ViewChild("cellLines", {static: true})
    public cellLinesStats: AsbStatisticsComponent<ClSnpModel>;

    @ViewChild("transcriptionFactors", {static: true})
    public tfStats: AsbStatisticsComponent<TfSnpModel>;

    @ViewChild('fdrViewTemplate', {static: true})
    private fdrViewTemplate: TemplateRef<{value: number}>;

    @ViewChild('tabGroup', {static: true})
    public tabGroup: MatTabGroup;

    @ViewChild('motifPanel')
    public motifPanel: MatExpansionPanel;

    @ViewChild('tourPopover')
    private tourPopover: AsbPopoverComponent;

    @ViewChild('asbMotifsComponent')
    public asbMotifsComponent: AsbMotifsComponent;

    public id: string;
    public alt: string;
    public snpData$: Observable<SnpInfoModel>;
    public snpDataLoading$: Observable<boolean>;

    public clColumnModel: AsbTableColumnModel<Partial<ClSnpModel>>;
    public clDisplayedColumns: AsbTableDisplayedColumns<ClSnpModel> = [
        ...commonInitialDisplayedColumns,
    ];

    private commonColumnModel:
        AsbTableColumnModel<Partial<TfSnpModel> | Partial<ClSnpModel>>;


    public tfColumnModel: AsbTableColumnModel<Partial<TfSnpModel>>;
    public tfDisplayedColumns: AsbTableDisplayedColumns<TfSnpModel> = [
        ...commonInitialDisplayedColumns,
        "motifFc",
        "motifConcordance",
    ];

    private subscriptions: Subscription = new Subscription();
    private release: ReleaseModel;
    public tourSteps: string[];
    public release$: Observable<ReleaseModel>;
    private fdr: string;

    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private router: Router,
        private saverService: FileSaverService,
        private dataService: DataService,
        private toastr: ToastrService,
        private releasesService: ReleasesService,
        private seoService: SeoService
    ) {}

    ngOnInit() {
        this.release$ = this.store.select(fromSelectors.selectCurrentRelease);
        this.subscriptions.add(
            this.release$.subscribe(
                s => this.release = s
            )
        );
        this.subscriptions.add(
            this.route.queryParams.subscribe(
                s => this.fdr = s['fdr'] ? s['fdr'] : 1
            )
        )
        this.subscriptions.add(
            this.route.paramMap.subscribe(
                (p) => {
                    this.id = p.get("rsId");
                    this.alt = p.get("alt");
                    if (!this.alt) {
                        this.router.navigate([`/${this.release.url}/search/simple`],
                            {queryParams: {rs: this.id}}).then()
                    } else {
                        this.store.dispatch(new fromActions.data.InitSnpInfoAction(
                            {rsId: this.id, alt: this.alt, fdr: this.fdr}));
                    }
                }

            )
        );


        this.snpData$ = this.store.select(fromSelectors.selectSnpInfoDataById, this.id + this.alt);
        this.snpDataLoading$ = this.store.select(fromSelectors.selectSnpInfoDataLoadingById, this.id + this.alt);
        this.subscriptions.add(
            this.snpData$.subscribe(s => {
                if (s) {
                    this.seoService.updateSeoInfo({
                        title: this.route.snapshot.data.title(this.id, this.release.version),
                        description: this.route.snapshot.data.description(this.id),
                    })
                }
                }
            )
        );

        this.tourSteps = [
            'snp-header',
            'sequence',
            'cell-types-buttons',
            'transcription-factors-buttons',
            'search-nearby',
            'genome-browser',
            'color-scales',
            'transcription-factors-stats',
            'transcription-factors-columns',
            'table0',
            'table1',
        ];
        this.subscriptions.add(
            this.snpData$.subscribe(
                s => {
                    if (s && s.cellLines) {
                        if (s.cellLines.length > 0 && s.transFactors.length > 0) {
                            this.tourSteps = this.tourSteps.filter(s => s != `table1`);
                        } else {
                            if (s.cellLines.length == 0) {
                                this.tourSteps = this.tourSteps.filter(s => s != 'cell-types-buttons' && s != 'table1');
                            } else {
                                this.tourSteps = this.tourSteps.filter(s => s != 'table0' && s != 'transcription-factors-buttons');
                            }
                        }
                        if (this._getGoodTfs(s.transFactors).length > 0) {
                            const ind: number = this._getGoodTfs(s.transFactors).findIndex(
                                s => s.name == this.route.snapshot.fragment || '');
                            if (ind != -1) {
                                this.tourSteps.push('motif-analysis-' + this._getGoodTfs(s.transFactors)[ind].name);
                            } else {
                                this.tourSteps.push('motif-analysis-' + this._getGoodTfs(s.transFactors)[0].name);
                            }
                        } else {
                            this.tourSteps.push('motif-analysis');

                        }
                        this.tourSteps.push('phen-stats');

                    }
                }
            )
        );

        this.commonColumnModel = {
            effectSizeRef: {
                view: "Effect size Ref",
                valueConverter: v => v !== null ? v.toFixed(2) : "n/a",
                isDesc: true
            },
            effectSizeAlt: {
                view: "Effect size Alt",
                valueConverter: v => v !== null ? v.toFixed(2) : "n/a",
                isDesc: true
            },
            pValueRef: {
                view: "FDR Ref",
                colorStyle: row => this._calculateColor(row, "ref"),
                columnTemplate: this.fdrViewTemplate
            },
            pValueAlt: {
                view: "FDR Alt",
                colorStyle: row => this._calculateColor(row, "alt"),
                columnTemplate: this.fdrViewTemplate
            },
            meanBad: {view: "Mean BAD", valueConverter: v => v.toFixed(2)}
        };

        this.clColumnModel = {
            name: {view: "Cell type", valueConverter: v => v, isSticky: true},
            ...this.commonColumnModel,
        };
        this.tfColumnModel = {
            name: {view: "Uniprot ID", valueConverter: v => v, isSticky: true},
            ...this.commonColumnModel,
            motifFc: {
                view: "Motif fold change",
                valueConverter: v => v !== null ? v.toFixed(2) : "n/a",
                helpMessage: 'log₂(Alt/Ref motif p-value)',
                isDesc: true
            },
            motifPRef: {
                view: "Motif Ref p-value",
                columnTemplate: this.fdrViewTemplate,
            },
            motifPAlt: {
                view: "Motif Alt p-value",
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
                valueConverter: v => v !== null ? '' + (v + 1) : "n/a",
                helpMessage: 'SNP position relative to the TF motif (1-based)'
            },
        };
    }

    getTextByStepName(step: string) {
        return getTextByStepNameAdastra(step);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    _downloadFile(options: {
        columns: string[],
        filter: string,
    },            where: TfOrCl) {
        this.subscriptions.add(
            this.dataService.getSnpInfoByIdCsv(
                this.id, this.alt, where, options.columns, options.filter).subscribe(
                (res) => {
                    this.saverService.save(res,
                        `AD_ASTRA_${this.id}_${this.alt}_SNP_details.tsv`);
                },
                (err) => {
                    this.toastr.error(err.message, "Error");
                }
            )
        );
    }

    _downloadPage() {
        this.subscriptions.add(
            this.dataService.getSnpInfoById({rsId: this.id, alt: this.alt, fdr: this.fdr}).subscribe(
                (res) => {
                    const blob = new Blob([JSON.stringify(res)],
                        {type: "application/json"});
                    this.saverService.save(blob, `AD_ASTRA_page_${this.id}_${this.alt}.json`);
                },
                (err) => {
                    console.log(err);
                }
            )
        );
    }

    _calculateColor(row: TfSnpModel | ClSnpModel, w: "ref" | "alt"): string {
        return w === "ref" ?
            calculateColorForOne(row.pValueRef, row.refBase) :
            calculateColorForOne(row.pValueAlt, row.altBase);
    }

    _createSnpName(snpData: SnpInfoModel, where: TfOrCl) {
        return (row: ClSnpModel | TfSnpModel) => `${snpData.rsId} ${snpData.refBase}>${snpData.altBase}` +
            (where === "cl" ? " in " : " of ") + this._getName(row);
    }

    _getName(row: ClSnpModel | TfSnpModel) {
        return row ? row.name : "fail";
    }

    filterCondition(tf: TfSnpModel): boolean {
        return !!(tf.motifConcordance && tf.motifConcordance !== "No Hit");
    }

    _getGoodTfs(tfs: TfSnpModel[]): TfSnpModel[] {
        return tfs.filter(s => this.filterCondition(s)).sort(
            (a, b) =>
                Math.max(b.effectSizeAlt, b.effectSizeRef) - Math.max(a.effectSizeAlt, a.effectSizeRef));
    }

    openMotifAnalysis($event: TfSnpModel, tfs: TfSnpModel[]) {
        const id: number = tfs.indexOf($event);
        const chosenExpansionPanel = this.asbMotifsComponent.expansionPanels.filter(
            (s, i) => i == id)[0];
        chosenExpansionPanel.open();

        if (this.motifPanel.closed) {
            this.motifPanel.open();
        }
        document.getElementById(tfs[id].name).scrollIntoView({behavior: "smooth"});
    }

    sortData(data: TfSnpModel[], sort: MatSort): TfSnpModel[] {
        return data.sort(
            (a, b) => compareData(a, b, sort)
        );
    }

    openPanels(tfs: TfSnpModel[]) {
        const ind: number = this.tourSteps.findIndex(s => s.match(/motif-analysis-/));
        if (ind != -1) {
            if (this.motifPanel.closed) {
                this.motifPanel.open();
            }
            const tf_name: string = this.tourSteps[ind].match(/motif-analysis-(.*)/)[1];

            const expPanel: MatExpansionPanel = this.asbMotifsComponent.expansionPanels.filter((s, i) =>
                i == tfs.findIndex(s => s.name == tf_name))[0];
            if (expPanel && expPanel.closed) {
                expPanel.open();
            }
        }
    }

    checkSelectedIndex(tabGroup: MatTabGroup, snp: SnpInfoModel) {
        const index = tabGroup.selectedIndex;
        if (snp.transFactors.length > 0 && snp.cellLines.length > 0) {
            tabGroup.selectedIndex = 0;
        }
        if (index == 0 && snp.transFactors.length == 0) {
            tabGroup.selectedIndex = 1;
        }
        if (index == 1 && snp.cellLines.length == 0) {
            tabGroup.selectedIndex = 0;
        }
    }
}

const commonInitialDisplayedColumns: AsbTableDisplayedColumns<Partial<TfSnpModel> | Partial<ClSnpModel>> = [
    "name",
    "effectSizeRef",
    "effectSizeAlt",
    "pValueRef",
    "pValueAlt",
    "meanBad",
];
