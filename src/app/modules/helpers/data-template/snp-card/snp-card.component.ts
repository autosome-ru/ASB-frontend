import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {SnpInfoModel} from "../../../../models/data.model";

@Component({
  selector: 'asb-snp-card',
  templateUrl: './snp-card.component.html',
  styleUrls: ['./snp-card.component.less']
})
export class AsbSnpCardComponent implements OnInit {
    @HostBinding("class.snp-card")
    private readonly cssClass = true;
    @Input()
    public snpData: SnpInfoModel;
    public showMoreCellLines: boolean = false;
    public showMoreTfs: boolean = false;
    public readonly maxButtons: number = 5;

    constructor() { }

    ngOnInit() {
    }

    _showMoreCellLines() {
        this.showMoreCellLines = !this.showMoreCellLines
    }

    _showMoreTfs() {
        this.showMoreTfs = !this.showMoreTfs
    }

}
