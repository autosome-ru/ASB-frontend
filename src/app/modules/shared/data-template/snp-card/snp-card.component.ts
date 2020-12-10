import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from "@angular/core";
import {SnpInfoModel, SnpSearchModel} from "src/app/models/data.model";
import * as fromSelectors from "src/app/store/selector/adastra";
import {ReleaseModel} from "../../../../models/releases.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AppState} from "../../../../store/reducer/adastra";
import {getTextByStepNameAdastra} from "../../../../helpers/text-helpers/tour.adastra.helper";
import {UrlService} from "../../../../services/url.service";

@Component({
    selector: "asb-snp-card",
    templateUrl: "./snp-card.component.html",
    styleUrls: ["./snp-card.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AsbSnpCardComponent implements OnInit {
    @HostBinding("class.snp-card")
    private readonly cssClass = true;
    @Input()
    public snpData: SnpSearchModel | SnpInfoModel;
    @Input()
    public noButtons = false;

    @Input()
    public index = 0;

    @Output()
    public emitNextStep = new EventEmitter<void>();

    public showMoreCellLines = false;
    public showMoreTfs = false;
    public release$: Observable<ReleaseModel>;
    public url: string;

    constructor(private store: Store<AppState>, private urlService: UrlService) { }

    ngOnInit() {
        this.url = this.urlService.hostName
        this.release$ = this.store.select(fromSelectors.selectCurrentRelease);
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
