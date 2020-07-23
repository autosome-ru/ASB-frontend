import {TfSnpModel} from "../../../models/data.model";
import {ChangeDetectionStrategy, Component, Input, OnInit, QueryList, ViewChildren} from "@angular/core";
import {Observable} from "rxjs";
import {MatExpansionPanel} from "@angular/material/expansion";
import {newArray} from "@angular/compiler/src/util";

@Component({
    selector: "asb-motifs",
    templateUrl: "./asb-motifs.component.html",

})
export class AsbMotifsComponent implements OnInit {

    @ViewChildren("panels")
    expansionPanels: QueryList<MatExpansionPanel>
    revCompStateArray: {[id: string]: boolean } = {};

    constructor() { }

    public _transcriptionFactors: TfSnpModel[]

    @Input()
    set transcriptionFactors(value: TfSnpModel[]) {
        this._transcriptionFactors = value;

    };

    ngOnInit(): void {
        this._transcriptionFactors.forEach(s => this.revCompStateArray[s.id] = false);
    }



    makeImagePath(tf: TfSnpModel): string {
        return `pngs/${tf.name}_${tf.rsId.slice(2)}_${tf.altBase}${this.revCompStateArray[tf.id] ? '_revcomp' : '' }.png`
    }

    changeRevCompState(tf: TfSnpModel) {
        this.revCompStateArray[tf.id] = !this.revCompStateArray[tf.id]
    }
}

