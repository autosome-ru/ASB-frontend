import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from "@angular/core";
import {ClSnpCutModel, ClSnpModel, TfSnpCutModel, TfSnpModel} from "src/app/models/data.model";
import {calculateColor} from "src/app/helpers/helper/colors.helper";

@Component({
    selector: "asb-snp-buttons",
    templateUrl: "./snp-buttons.component.html",
    styleUrls: ["../snp-card.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})


export class SnpButtonsComponent implements OnInit {

    @Input()
    public maxObjects: number;
    @Input()
    public data: TfSnpModel[] | ClSnpModel[] | TfSnpCutModel[] | ClSnpCutModel[];
    @Input()
    public tfOrCl: "tf" | "cl";
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
        return calculateColor(this.data[i].pValueRef,
            this.data[i].pValueAlt, this.data[i].refBase, this.data[i].altBase);
    }

    _showMoreObjects() {
        this.showMoreObjects = !this.showMoreObjects;
        this.objectsQualChanged.emit(this.showMoreObjects);
    }
}
