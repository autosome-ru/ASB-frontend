import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from "@angular/core";
import {SnpInfoModel, SnpSearchModel} from "src/app/models/data.model";
import {environment} from "src/environments/environment";
import * as fromSelectors from "src/app/store/selector";
import {ReleaseModel} from "../../../../models/releases.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AppState} from "../../../../store/reducer";

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
        let text: string = '';
        switch (step) {
            case 'sequence':
                text = 'SNV genomic context\n +/- 25 nucleotides'
                break
            case 'cell-types-buttons':
                text = 'Cell types from GTRD database\n' +
                    'having ASB at this SNV.\n Click for GTRD link.'
                break
            case 'transcription-factors-buttons':
                text = 'Transcription factors from GTRD database\n' +
                    'having ASB at this SNV.\n Click to go to the UNIPROT page.'
                break

        }
        return {text}
    }
}
