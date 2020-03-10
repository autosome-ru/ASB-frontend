import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SnpInfoModel} from "../../../models/data.model";

@Component({
    selector: "asb-phenotypes",
    templateUrl: "./phenotypes.component.html",
    styleUrls: ["./phenotypes.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhenotypesComponent implements OnInit {

    @Input()
    public snpData: SnpInfoModel;
    @Output()
    public phenotypesEmpty = new EventEmitter<boolean>();
    public phenotypesDb: string[];
    constructor() { }

    ngOnInit(): void {
        this.phenotypesDb = Object.keys(this.snpData.phenotypes).filter(
            s => this.snpData.phenotypes[s].length > 0);
        if (this.phenotypesDb.length === 0) {
            this.phenotypesEmpty.emit(true);
        } else {
            this.phenotypesEmpty.emit(false);
        }
    }

}
