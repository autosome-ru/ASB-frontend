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
    @Input()
    public noButtons: boolean = false;

    public showMoreCellLines: boolean = false;
    public showMoreTfs: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    _showMoreCellLines(value: boolean) {
        this.showMoreCellLines = value
    }
    _showMoreTfs(value: boolean) {
        this.showMoreTfs = value
    }



}
