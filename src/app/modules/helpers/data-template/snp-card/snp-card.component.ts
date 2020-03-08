import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from "@angular/core";
import {SnpSearchModel} from "src/app/models/data.model";

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
    public snpData: SnpSearchModel;
    @Input()
    public noButtons: boolean = false;

    public showMoreCellLines: boolean = false;
    public showMoreTfs: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    _showMoreCellLines(value: boolean) {
        this.showMoreCellLines = value;
    }
    _showMoreTfs(value: boolean) {
        this.showMoreTfs = value;
    }



}
