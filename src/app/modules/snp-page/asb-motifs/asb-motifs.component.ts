import {TfSnpModel} from "../../../models/data.model";
import {ChangeDetectionStrategy, Component, Input, OnInit, QueryList, ViewChildren} from "@angular/core";
import {Observable} from "rxjs";
import {MatExpansionPanel} from "@angular/material/expansion";

@Component({
    selector: "asb-motifs",
    templateUrl: "./asb-motifs.component.html",

})
export class AsbMotifsComponent implements OnInit {

    @ViewChildren("panels")
    expansionPanels: QueryList<MatExpansionPanel>
    private manuallyOpenedTfs: number[] = [0];

    constructor() { }

    @Input()
    transcriptionFactors: TfSnpModel[];

    ngOnInit(): void {
    }



    makeImagePath(tf: TfSnpModel): string {
        return `pngs/${tf.name}_${tf.rsId.slice(2)}_${tf.altBase}.png`
    }
}

