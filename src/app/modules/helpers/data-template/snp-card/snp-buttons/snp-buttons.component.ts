import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClSnpModel, TfSnpModel} from "../../../../../models/data.model";
import {calculateColor} from "src/app/helpers/colors.helper";

@Component({
    selector: 'asb-snp-buttons',
    templateUrl: './snp-buttons.component.html',
    styleUrls: ['../snp-card.component.less']
})
export class SnpButtonsComponent implements OnInit {

    @Input()
    public maxObjects: number;
    @Input()
    public data: TfSnpModel[] | ClSnpModel[];

    @Input()
    public showMoreObjects: boolean = false;
    @Input()
    public buttonsClass: string;
    @Output() objectsQualChanged = new EventEmitter<boolean>();

    @Input()
    public noButtons: boolean = false;

    constructor() {}
    ngOnInit() {

    }
    _calculateColor(i: number) {
        return calculateColor(this.data[i].pValueRef, this.data[i].pValueAlt)
    }

    _showMoreObjects() {
        this.showMoreObjects = !this.showMoreObjects;
        this.objectsQualChanged.emit(this.showMoreObjects);
    }
}
