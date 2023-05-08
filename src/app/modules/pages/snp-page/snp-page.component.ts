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
import {ClSnpModel, SnpInfoModel, AggType, TfSnpModel} from "src/app/models/data.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/reducer/adastra";
import * as fromSelectors from "src/app/store/selector/adastra";
import * as fromActions from "src/app/store/action/adastra";
import {AsbTableColumnModel, AsbTableDisplayedColumns} from "../../../models/table.model";
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
    // tslint:disable-next-line:component-selector
    selector: "asb-snp-page",
    templateUrl: "./snp-page.component.html",
    styleUrls: ["./snp-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SnpPageComponent implements OnInit, OnDestroy {
    // @ViewChild("atacStatistics", {static: true})
    // public cellLinesStats: AsbStatisticsComponent<ClSnpModel>;
    //
    // @ViewChild("transcriptionFactors", {static: true})
    // public tfStats: AsbStatisticsComponent<ClSnpModel>;

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
        AsbTableColumnModel<Partial<ClSnpModel>>;

    private subscriptions: Subscription = new Subscription();
    private release: ReleaseModel;
    public tourSteps: string[];
    public release$: Observable<ReleaseModel>;
    public fdr: string;
    public es: string;

    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private router: Router,
        private saverService: FileSaverService,
        private dataService: DataService,
        private toastr: ToastrService,
        private releaseService: ReleasesService,
        private seoService: SeoService,
    ) {}

    ngOnInit(): void {
        this.release$ = this.store.select(fromSelectors.selectCurrentRelease);
        const chosenRelease = this.releaseService.getReleaseFromFullPath();
        this.subscriptions.add(
            this.release$.subscribe(
                s => this.release = s
            )
        );
        this.subscriptions.add(
            this.route.queryParams.subscribe(
                s => {
                    this.fdr = s.fdr ?? chosenRelease.defaultFdrThreshold;
                    this.es = s.es ?? '0';
                    this.subscriptions.add(
                        this.route.paramMap.subscribe(
                            (p) => {
                                this.id = p.get("rsId");
                                this.alt = p.get("alt");
                                if (!this.alt) {
                                    this.router.navigate([`/${this.release.url}/search/simple`],
                                        {queryParams: {rs: this.id, fdr: this.fdr, es: this.es}}).then();
                                } else {
                                    this.store.dispatch(new fromActions.data.InitSnpInfoAction(
                                        {rsId: this.id, alt: this.alt, fdr: this.fdr, es: this.es}));
                                }
                            }

                        )
                    );
                }
            )
        );

        this.snpData$ = this.store.select(fromSelectors.selectSnpInfoDataById(this.id + this.alt));
        this.snpDataLoading$ = this.store.select(fromSelectors.selectSnpInfoDataLoadingById(this.id + this.alt));
        this.subscriptions.add(
            this.snpData$.subscribe(s => {
                if (s) {
                    this.seoService.updateSeoInfo({
                        title: this.route.snapshot.data.title(this.id, this.release.version),
                        description: this.route.snapshot.data.description(this.id),
                    });
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
            'phelige',
            'color-scales',
            'transcription-factors-stats',
            'transcription-factors-columns',
            'table0',
            'table1',
        ];
        this.subscriptions.add(
            this.snpData$.subscribe(
                s => {
                    if (s && s.faireData) {
                        if (s.faireData.length > 0 && s.dnaseData.length > 0) {
                            this.tourSteps = this.tourSteps.filter(p => p !== `table1`);
                        } else {
                            if (s.faireData.length === 0) {
                                this.tourSteps = this.tourSteps.filter(
                                    p => p !== 'cell-types-buttons' && p !== 'table1');
                            } else {
                                this.tourSteps = this.tourSteps.filter(
                                    p => p !== 'table0' && p !== 'transcription-factors-buttons');
                            }
                        }
                        this.tourSteps.push('phen-stats');

                    }
                }
            )
        );

        this.commonColumnModel = {
            effectSizeRef: {
                view: "Effect size Ref",
                helpMessage: 'log2-scale',
                valueConverter: v => v !== null ? v.toFixed(2) : "n/a",
                isDesc: true
            },
            effectSizeAlt: {
                view: "Effect size Alt",
                helpMessage: 'log2-scale',
                valueConverter: v => v !== null ? v.toFixed(2) : "n/a",
                isDesc: true
            },
            pValueRef: {
                view: "FDR Ref",
                colorStyle: row => ({background: this._calculateColor(row, "ref")}),
                columnTemplate: this.fdrViewTemplate
            },
            pValueAlt: {
                view: "FDR Alt",
                colorStyle: row => ({background: this._calculateColor(row, "alt")}),
                columnTemplate: this.fdrViewTemplate
            },
            meanBad: {view: "Mean BAD", valueConverter: v => v.toFixed(2)}
        };

        this.clColumnModel = {
            name: {view: "Cell type", valueConverter: v => v, isSticky: true},
            ...this.commonColumnModel,
        };
    }

    getTextByStepName(step: string): {text: string} {
        return getTextByStepNameAdastra(step);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    _downloadFile(options: {
        columns: Array<keyof ClSnpModel>,
        filter: string,
    },            where: AggType): void {
        this.subscriptions.add(
            this.dataService.getSnpInfoByIdCsv(
                this.id, this.alt, where, options.columns, options.filter).subscribe(
                (res) => {
                    this.saverService.save(res,
                        `UDACHA_${this.id}_${this.alt}_SNP_details.tsv`);
                },
                (err) => {
                    this.toastr.error(err.message, "Error");
                }
            )
        );
    }

    _downloadPage(): void {
        this.subscriptions.add(
            this.dataService.getSnpInfoById({rsId: this.id, alt: this.alt, fdr: this.fdr}).subscribe(
                (res) => {
                    const blob = new Blob([JSON.stringify(res)],
                        {type: "application/json"});
                    this.saverService.save(blob, `UDACHA_page_${this.id}_${this.alt}.json`);
                },
                (err) => {
                    console.log(err);
                }
            )
        );
    }

    _calculateColor(row: Partial<ClSnpModel>, w: "ref" | "alt"): string {
        return w === "ref" ?
            calculateColorForOne(row.pValueRef, row.refBase) :
            calculateColorForOne(row.pValueAlt, row.altBase);
    }

    _createSnpName(snpData: SnpInfoModel): (row: ClSnpModel) => string {
        return (row: ClSnpModel) => `${snpData.rsId} ${snpData.refBase}>${snpData.altBase}` +
            " of " + this._getName(row);
    }

    _getName(row: ClSnpModel): string {
        return row ? row.name : "fail";
    }

    // openMotifAnalysis($event: TfSnpModel, tfs: TfSnpModel[]) {
    //     const id: number = tfs.indexOf($event);
    //     const chosenExpansionPanel = this.asbMotifsComponent.expansionPanels.filter(
    //         (s, i) => i == id)[0];
    //     chosenExpansionPanel.open();
    //
    //     if (this.motifPanel.closed) {
    //         this.motifPanel.open();
    //     }
    //     document.getElementById(tfs[id].name).scrollIntoView({behavior: "smooth"});
    // }

    sortData(data: ClSnpModel[], sort: MatSort): ClSnpModel[] {
        return data.sort(
            (a, b) => compareData(a, b, sort)
        );
    }

    // openPanels(tfs: TfSnpModel[]) {
    //     const ind: number = this.tourSteps.findIndex(s => s.match(/motif-analysis-/));
    //     if (ind != -1) {
    //         if (this.motifPanel.closed) {
    //             this.motifPanel.open();
    //         }
    //         const tf_name: string = this.tourSteps[ind].match(/motif-analysis-(.*)/)[1];
    //
    //         const expPanel: MatExpansionPanel = this.asbMotifsComponent.expansionPanels.filter((s, i) =>
    //             i == tfs.findIndex(s => s.name == tf_name))[0];
    //         if (expPanel && expPanel.closed) {
    //             expPanel.open();
    //         }
    //     }
    // }

    checkSelectedIndex(tabGroup: MatTabGroup, snp: SnpInfoModel): void {
        const index = tabGroup.selectedIndex;
        if (snp.dnaseData.length > 0 && snp.faireData.length > 0 && snp.atacData.length > 0) {
            tabGroup.selectedIndex = 0;
        }
        if (index === 0 && snp.dnaseData.length === 0) {
            tabGroup.selectedIndex = 1;
        }
        if (index === 1 && snp.faireData.length === 0) {
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
