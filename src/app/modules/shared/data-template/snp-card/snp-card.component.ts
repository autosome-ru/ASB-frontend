import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input, OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from "@angular/core";
import {SnpInfoModel, SnpSearchModel} from "src/app/models/data.model";
import * as fromSelectors from "src/app/store/selector/adastra";
import {ReleaseModel} from "../../../../models/releases.model";
import {Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import {AppState} from "../../../../store/reducer/adastra";
import {getTextByStepNameAdastra} from "../../../../helpers/text-helpers/tour.adastra.helper";
import {UrlService} from "../../../../services/url.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {fdrOptions, esOptions} from "../../../../helpers/constants/constants";

@Component({
    selector: "asb-snp-card",
    templateUrl: "./snp-card.component.html",
    styleUrls: ["./snp-card.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AsbSnpCardComponent implements OnInit, OnDestroy {
    @HostBinding("class.snp-card")
    private readonly cssClass = true;
    @Input()
    public snpData: SnpSearchModel | SnpInfoModel;
    @Input()
    public noButtons = false;

    @Input()
    public index = 0;

    @Input()
    public fdr: string;

    @Input()
    public es: string;

    @Output()
    public emitNextStep = new EventEmitter<void>();

    public showMoreCellLines = false;
    public showMoreTfs = false;
    private subscription = new Subscription()
    public release$: Observable<ReleaseModel>;
    public url: string;
    public thresholdsGroup: FormGroup;
    public fdrOptions: string[] = fdrOptions;
    public esOptions: string[] = esOptions;

    constructor(private store: Store<AppState>,
                private formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private urlService: UrlService) { }

    ngOnInit() {
        this.thresholdsGroup = this.formBuilder.group({
            fdr: this.fdr,
            es: this.es
        })
        this.subscription.add(
            this.thresholdsGroup.get('fdr').valueChanges.subscribe(
                s => this.router.navigate([],
                    {relativeTo: this.route, queryParams: {fdr: s}, queryParamsHandling: "merge"})
            )
        );
        this.subscription.add(
            this.thresholdsGroup.get('es').valueChanges.subscribe(
                s => this.router.navigate([],
                    {relativeTo: this.route, queryParams: {es: s}, queryParamsHandling: "merge"},)
            )
        );
        this.url = this.urlService.hostName;
        this.release$ = this.store.select(fromSelectors.selectCurrentRelease);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

    _showMoreCellLines(value: boolean) {
        this.showMoreCellLines = value;
    }
    _showMoreTfs(value: boolean) {
        this.showMoreTfs = value;
    }

    getTextByStepName(step: string, component?: string) {
        return getTextByStepNameAdastra(step, component);
    }

    nextStep() {
        this.emitNextStep.emit();
    }
}
