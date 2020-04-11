import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {SnpInfoModel} from "../../../models/data.model";
import {phenotypesToView} from "../../../helpers/constants";

@Component({
    selector: "asb-phenotypes",
    templateUrl: "./phenotypes.component.html",
    styleUrls: ["./phenotypes.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhenotypesComponent implements OnInit {

    @Input()
    public snpData: SnpInfoModel;

    public phenotypesDb: string[];
    readonly phenToView: { [p: string]: string } = phenotypesToView;
    constructor() { }

    ngOnInit(): void {
        this.phenotypesDb = Object.keys(this.snpData.phenotypes).filter(
            s => this.snpData.phenotypes[s].length > 0);
    }

}
