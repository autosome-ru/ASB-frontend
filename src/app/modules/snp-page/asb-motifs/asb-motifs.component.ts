import {TfSnpModel} from "../../../models/data.model";
import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";

@Component({
    selector: "asb-motifs",
    templateUrl: "./asb-motifs.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsbMotifsComponent implements OnInit {
    private manuallyOpenedTfs: number[];

    constructor() { }

    @Input()
    transcriptionFactors: TfSnpModel[];

    @Input()
    openedTf: TfSnpModel;

    ngOnInit(): void {

    }

    getExpandedIndex(tfSnpModels: TfSnpModel[], index): boolean {
        return tfSnpModels.indexOf(this.openedTf) == index || this.manuallyOpenedTfs.some(s => s === index)
    }

    makeImagePath(tf: TfSnpModel): string {
        return `pngs/${tf.name}_${tf.rsId.slice(2)}_${tf.altBase}.png`
    }

    _addToManuallyOpenedList(i: number) {
        this.manuallyOpenedTfs.push(i)
    }

    _deleteToManuallyOpenedList(i: number) {
        this.manuallyOpenedTfs.filter(s => s !== i)
    }
}

