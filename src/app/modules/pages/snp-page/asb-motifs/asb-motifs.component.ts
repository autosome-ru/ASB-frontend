import {TfSnpModel} from "../../../../models/data.model";
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from "@angular/core";
import {MatExpansionPanel} from "@angular/material/expansion";
import {DataService} from "../../../../services/data.service";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {FileSaverService} from "ngx-filesaver";
import {getTextByStepName} from "../../../../helpers/helper/tour-text.helper";

@Component({
    selector: "asb-motifs",
    templateUrl: "./asb-motifs.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AsbMotifsComponent implements OnInit, OnDestroy {

    @ViewChildren("panels")
    expansionPanels: QueryList<MatExpansionPanel>
    revCompStateArray: {[id: string]: boolean } = {};
    private subscriptions = new Subscription()

    constructor(
        private dataService: DataService,
        private toastrService: ToastrService,
        private saverService: FileSaverService
    ) { }

    public _transcriptionFactors: TfSnpModel[]

    @Input()
    set transcriptionFactors(value: TfSnpModel[]) {
        this._transcriptionFactors = value;
    };

    ngOnInit(): void {
        this._transcriptionFactors.forEach(s => this.revCompStateArray[s.id] = false);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    getTextByStepName(step: string) {
        return getTextByStepName(step)
    }



    makeImagePath(tf: TfSnpModel, isSvg?: boolean): string {
        return `${isSvg ? 'svgs' : 'pngs'}/${tf.name}_${tf.rsId.slice(2)}_${tf.altBase}${this.revCompStateArray[tf.id] ? '_revcomp' : '' }.${isSvg ? 'svg' : 'png'}`
    }

    changeRevCompState(tf: TfSnpModel) {
        this.revCompStateArray[tf.id] = !this.revCompStateArray[tf.id]
    }

    downloadSvg(path: string) {
        this.subscriptions.add(
            this.dataService.downloadSvg(path).subscribe(
                (blob) =>
                    this.saverService.save(blob, path.slice(5)),
                (error: HttpErrorResponse) =>
                    this.toastrService.error(`Image download failed. Please try again later.`, `${error.statusText} ${error.status}`,)
            )
        )
    }
}

