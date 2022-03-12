import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromActions from 'src/app/store/action/ananastra';
import * as fromSelectors from 'src/app/store/selector/ananastra';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {
    AnnotationDataModel,
    AnnotationSnpModel,
    BackgroundSelect,
    PingDataModel, StatsDataModel
} from 'src/app/models/annotation.model';
import {MatTabGroup} from '@angular/material/tabs';
import {DownloadTableType} from '../../../models/data.model';
import {DownloadService} from 'src/app/services/download.service';
import {FileSaverService} from 'ngx-filesaver';
import {AnnotationStoreState} from "../../../store/reducer/ananastra";
import {ReleaseModel} from "../../../models/releases.model";
import {ananastraRelease} from "../../../helpers/constants/releases";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Clipboard} from "@angular/cdk/clipboard";
import {SeoService} from "../../../services/seo.servise";
import {getTextByStepNameAnanas} from "../../../helpers/text-helpers/tour.ananas.helper";
import {convertBackgroundChoicesHelper} from "../../../helpers/text-helpers/convert-background-choices.helper";
import {TicketStatsComponent} from "./ticket-stats/ticket-stats.component";
import {ScriptService} from "../../../services/script.service";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/operators";
import {AsbServerSideFilterModel, AsbServerSideModel} from "../../../models/table.model";
import {initialServerParams} from "../../../helpers/constants/constants";
import {SortDirection} from "@angular/material/sort";

@Component({
    selector: 'astra-ticket-page',
    templateUrl: './ticket-page.component.html',
    styleUrls: ['./ticket-page.component.less', '../snp-annotation-main/snp-annotation-main.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TicketPageComponent implements OnInit, OnDestroy {
    @ViewChild('tabGroup')
    private tabGroup: MatTabGroup;
    @ViewChild(TicketStatsComponent)
    private ticketStats: TicketStatsComponent;
    public ticket: string;
    private subscriptions = new Subscription();
    public fileStatistics$: Observable<{ data?: AnnotationDataModel; loading: boolean }>;
    public tfTableData$: Observable<{ data?: AnnotationSnpModel[]; loading: boolean; total?: number }>;
    public clTableData$: Observable<{ data?: AnnotationSnpModel[]; loading: boolean; total?: number }>;

    public tfTableDataSum$: Observable<{ data?: AnnotationSnpModel[]; loading: boolean; total?: number }>;
    public clTableDataSum$: Observable<{ data?: AnnotationSnpModel[]; loading: boolean; total?: number }>;

    public isExpanded = true;
    public recentRelease: ReleaseModel;
    public selectedTab: tabEnum;
    public timeoutId: number = null;
    public paginationParams: AsbServerSideFilterModel = initialServerParams;
    public selectedName: {
        tfSum: string, tf: string, cl:  string, clSum: string,
    } = {tf: null, tfSum: null, cl: null, clSum: null};
    public pingLoading$: Observable<boolean>;
    public pingData$: Observable<PingDataModel>;
    public ticketProcessing$: Observable<boolean>;
    public steps: string[] = [
        'ticket',
        'sum-head',
        'stats',
        'chrom-agg',
        'chrom-table',
        'tf-head',
        'cl-head',
        'odds-table-open',
        'odds-table',
        'col-button',
        'pie-chart',
        'columns-select', 'download-table',
        'filter'
    ];
    public panelExpanded: boolean = false;
    private fdr: number;
    public chrPanelOpened: boolean = false;
    public chartLoaded: boolean;


    constructor(private route: ActivatedRoute,
                private store: Store<AnnotationStoreState>,
                private router: Router,
                private seoService: SeoService,
                private clipboard: Clipboard,
                private scriptService: ScriptService,
                private toastrService: ToastrService,
                private cd: ChangeDetectorRef,
                private _snackBar: MatSnackBar,
                private downloadService: DownloadService,
                private fileSaverService: FileSaverService) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
        this.scriptService.load('charts').then(data => {
            this.chartLoaded = data.filter(v =>
                v.script === 'charts')[0].loaded;
            this.cd.detectChanges();
        }).catch(() => this.toastrService.error(
            "Can't load Chart.js library, check your internet connection", 'Error'));

        this.recentRelease = ananastraRelease;
        this.subscriptions.add(
            this.route.paramMap.subscribe(
                s => {
                    this.ticket = s.get('id');
                    this.seoService.updateSeoInfo({
                        title: this.route.snapshot.data.title(this.ticket),
                        description: this.route.snapshot.data.description
                    })
                }
            )
        );

        this.fileStatistics$ = this.store.select(
            fromSelectors.selectAnnotationDataById(this.ticket));
        this.pingLoading$ = this.store.select(
            fromSelectors.selectPingDataLoadingById(this.ticket));
        this.pingData$ = this.store.select(
            fromSelectors.selectPingDataById(this.ticket));
        this.store.dispatch(new fromActions.annotation.InitPingAnnotationAction(
            this.ticket));
        this.subscriptions.add(
            this.pingData$.subscribe(
                f => {
                    if (f) {
                        switch (f.status) {
                            case 'Processed':
                                this.store.dispatch(new fromActions.annotation.InitAnnotationInfoStatsAction(
                                    this.ticket));
                                this.subscriptions.add(
                                    this.fileStatistics$.subscribe(
                                        s => {
                                            if (s && !s.loading && s.data) {
                                                this.fdr = -Math.log10(s.data.metaInfo.fdr)
                                                this.selectedTab = tabEnum.sum
                                            }
                                        }
                                    )
                                )

                                break;
                             case 'Processing':
                                 this.timeoutId = window.setTimeout(
                                     () => {
                                         this.store.dispatch(new fromActions.annotation.InitPingAnnotationAction(
                                             this.ticket));
                                         this.clearInterval()
                                     }, 1000
                                 )
                                break;
                             case 'Created':
                                 this.store.dispatch(new fromActions.annotation.InitAnnotationStartAction(
                                     {
                                         ticket: this.ticket,
                                         background: 'WG',
                                         fdr: this.recentRelease.defaultFdrThreshold,
                                         es: '0'}));
                                 this.store.dispatch(new fromActions.annotation.InitPingAnnotationAction(
                                     this.ticket));
                                break;
                             case 'Failed':
                                break;

                        }
                    } else {
                        this.store.dispatch(new fromActions.annotation.InitPingAnnotationAction(
                            this.ticket));
                    }
                }
            )
        );
        this.ticketProcessing$ = this.store.select(fromSelectors.selectProcessingById(this.ticket));
        this.tfTableData$ = this.store.select(fromSelectors.selectAnnotationTfTable(this.ticket));
        this.clTableData$ = this.store.select(fromSelectors.selectAnnotationClTable(this.ticket));
        this.tfTableDataSum$ = this.store.select(fromSelectors.selectAnnotationTfTableSum(this.ticket));
        this.clTableDataSum$ = this.store.select(fromSelectors.selectAnnotationClTableSum(this.ticket));

    }

    ngOnDestroy(): void {
        this.clearInterval()
        this.subscriptions.unsubscribe();
    }
    clearInterval(): void {
        if (this.timeoutId) {
            window.clearInterval(this.timeoutId);
            this.timeoutId = null;
        }

    }

    tabIndexChanged(index: number): void {
        this.selectedTab = index;
        this.initTableLoad();
    }

    groupValueChanged(event: boolean): void {
        this.isExpanded = event;
        this.initTableLoad();
    }

    initTableLoad(force:boolean=false): void {
        if (this.selectedTab !== tabEnum.sum || force) {
            this.paginationParams = {
                ...this.paginationParams,
                active: '',
                direction: ''
            }
            this.store.dispatch(new fromActions.annotation.InitAnnotationTableAction(
                {
                    pagination: this.paginationParams,
                    ticket: this.ticket,
                    tfOrCl: this.selectedTab === tabEnum.cl ? 'cl' : 'tf',
                    isExpanded: this.isExpanded
                }));
        }
    }
    getFileName(downloadType: DownloadTableType, isExpanded?: boolean): string {
        return `ananastra_${this.ticket}.${downloadType + (isExpanded ? '' : '_collapsed')}.tsv`
    }

    downloadTable(downloadType: DownloadTableType, isExpanded?: boolean): void {
        if (isExpanded === undefined) {
            isExpanded = this.isExpanded
        }
        this.subscriptions.add(
            this.downloadService.downloadTable(this.ticket, downloadType, isExpanded).subscribe(
                b => this.fileSaverService.save(b, this.getFileName(downloadType, isExpanded))
            )
        );
    }

    getTooltip(date: string): string {
        return `This is your unique job ticked ID. You can use it to access the report on your query later upon completion.
         Your results will be available until ${date ? date : ''}. Click to copy.`
    }

    copyTicket() {
        this.clipboard.copy(this.ticket);
        this._snackBar.open('Copied to clipboard', null, {
            panelClass: 'centered-snackbar',
            duration: 2000,
        });
    }

    getTextByStepName(str: string) {
        return getTextByStepNameAnanas(str)
    }

    selectTabById(id:tabEnum=tabEnum.sum) {
        this.selectedTab = id
    }


    optionToView(option: BackgroundSelect) {
        return convertBackgroundChoicesHelper(option)
    }

    getHelpTooltip(bg: BackgroundSelect): string {
        switch (bg) {
            case "LOCAL":
                return 'ADASTRA \'candidate\' SNPs located within the same 1 Mbp windows as the ‘test’ SNPs of the user-submitted list.'
            case "WG":
                return 'All ADASTRA \'candidate\' SNPs eligible for ASB assessment.'
            default:
                return 'ADASTRA \'candidate\' SNPs located in the same LD-islands as the ‘test’ SNPs of the user-submitted list.'
        }
    }

    countTooltip(metaInfo: StatsDataModel): string {
        return `${metaInfo.totalUnqiueSNPs} unique IDs of ${metaInfo.totalSNPs} submitted, ${metaInfo.notFound} IDs not found in ADASTRA`
    }

    getDataObservable(tfTbData: Observable<{data?: AnnotationSnpModel[]; loading: boolean}>) {
        return tfTbData.pipe(map(s => s.data))
    }

    revertDirection(direction: SortDirection): SortDirection {
        switch (direction) {
            case "asc":
                return "desc"
            case "desc":
                return "asc"
            default:
                return ""
        }
    }

    checkSortToRevert(direction: SortDirection, active: string): SortDirection {
        if (active && (active.startsWith('log10Fdr') || active.startsWith('motifLogP') || active === 'log10TopFdr')) {
            return this.revertDirection(direction)
        } else {
            return direction
        }
    }

    tableChanged(event: AsbServerSideModel) {
        this.paginationParams = {
            ...this.paginationParams,
            ...event,
            active: event.active === 'chr' ? 'genomePosition' : event.active,
            direction: this.checkSortToRevert(event.direction, event.active)
        };
        this.store.dispatch(new fromActions.annotation.LoadAnnotationTableAction({
                pagination: this.paginationParams,
                isExpanded: this.isExpanded,
                ticket: this.ticket,
                tfOrCl: this.selectedTab === tabEnum.cl ? 'cl' : 'tf',
            }
        ))
    }

    changedName(name: string, field: string) {
        this.selectedName[field] = name
        this.paginationParams = {
            ...this.paginationParams,
            regexp: name
        }
        this.tableChanged(this.paginationParams)
    }
}

enum tabEnum {
    'sum' = 0,
    'tf' = 1,
    'cl' = 2
}
