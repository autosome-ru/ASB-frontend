import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {SnpInfoModel} from "../../../../models/data.model";
import {phenotypesToLink, phenotypesToView} from "../../../../helpers/constants/constants";

@Component({
    selector: "asb-phenotypes",
    templateUrl: "./phenotypes.component.html",
    styleUrls: ["./phenotypes.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PhenotypesComponent implements OnInit {

    @Input()
    public snpData: SnpInfoModel;

    public phenotypesDb: string[];
    readonly phenToView: { [p: string]: string } = phenotypesToView;
    public phenToLink: { [p: string]: (s: string) => string };
    constructor() { }

    ngOnInit(): void {
        this.phenotypesDb = Object.keys(this.snpData.phenotypes).filter(
            s => this.snpData.phenotypes[s].length > 0);
        this.phenToLink = phenotypesToLink;
    }

}
