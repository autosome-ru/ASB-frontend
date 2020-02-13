import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClSnpModel, TfSnpModel} from "../../../../../models/data.model";

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

    _showMoreObjects() {
        this.showMoreObjects = !this.showMoreObjects;
        this.objectsQualChanged.emit(this.showMoreObjects);
    }
}
