import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output} from "@angular/core";
import {SnpInfoModel, SnpSearchModel} from "src/app/models/data.model";
import {environment} from "src/environments/environment";
import * as fromSelectors from "src/app/store/selector";
import {ReleaseModel} from "../../../../models/releases.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AppState} from "../../../../store/reducer";
import {getTextByStepName} from "../../../../helpers/tour-text.helper";

@Component({
    selector: "asb-snp-card",
    templateUrl: "./snp-card.component.html",
    styleUrls: ["./snp-card.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsbSnpCardComponent implements OnInit {
    @HostBinding("class.snp-card")
    private readonly cssClass = true;
    @Input()
    public snpData: SnpSearchModel | SnpInfoModel;
    @Input()
    public noButtons: boolean = false;

    @Output()
    public emitNextStep = new EventEmitter<void>();

    public showMoreCellLines: boolean = false;
    public showMoreTfs: boolean = false;
    public serverUrl: string = environment.serverUrl;
    public release$: Observable<ReleaseModel>;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.release$ = this.store.select(fromSelectors.selectCurrentRelease)
    }

    _showMoreCellLines(value: boolean) {
        this.showMoreCellLines = value;
    }
    _showMoreTfs(value: boolean) {
        this.showMoreTfs = value;
    }

    getTextByStepName(step: string) {
        return getTextByStepName(step)
    }

    nextStep() {
        this.emitNextStep.emit()
    }
}
