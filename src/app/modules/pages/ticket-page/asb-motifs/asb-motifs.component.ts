import {TfSnpModel} from "../../../../models/data.model";
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, Inject,
    Input,
    OnDestroy,
    OnInit, PLATFORM_ID,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from "@angular/core";
import {MatExpansionPanel} from "@angular/material/expansion";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {FileSaverService} from "ngx-filesaver";
import {isPlatformBrowser} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "asb-motifs",
    templateUrl: "./asb-motifs.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AsbMotifsComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChildren("panels")
    expansionPanels: QueryList<MatExpansionPanel>;
    revCompStateArray: {[id: string]: boolean } = {};
    private subscriptions = new Subscription();
    private readonly isBrowser: boolean;
    public openedTfName: string;

    constructor(
        private toastrService: ToastrService,
        private saverService: FileSaverService,
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId
    ) { this.isBrowser = isPlatformBrowser(platformId); }

    public _transcriptionFactors: TfSnpModel[];

    @Input()
    set transcriptionFactors(value: Partial<TfSnpModel>[]) {
        this._transcriptionFactors = value as TfSnpModel[];
    }

    ngOnInit(): void {
        this._transcriptionFactors.forEach(s => this.revCompStateArray[s.id] = false);
        if (this.route.snapshot.fragment) {
            this.openedTfName = this.route.snapshot.fragment;
        }

    }

    ngAfterViewInit(): void {
        if (this.isBrowser && this.route.snapshot.fragment) {
            const initialElement: HTMLElement = document.getElementById(this.route.snapshot.fragment);
            if (initialElement) {
                setTimeout(() =>
                    initialElement.scrollIntoView({behavior: 'smooth'}), 0);
            }
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    makeImagePath(tf: TfSnpModel, isSvg?: boolean): string {
        return `${isSvg ? 'svgs' : 'pngs'}/v2/${tf.name}_${tf.rsId.slice(2)}_${tf.altBase}${this.revCompStateArray[tf.id] ? '_revcomp' : '' }.${isSvg ? 'svg' : 'png'}`;
    }

    changeRevCompState(tf: TfSnpModel): void {
        this.revCompStateArray[tf.id] = !this.revCompStateArray[tf.id];
    }

    // downloadSvg(path: string): void {
    //     this.subscriptions.add(
    //         this.dataService.downloadSvg(path).subscribe(
    //             (blob) =>
    //                 this.saverService.save(blob, path.slice(5)),
    //             (error: HttpErrorResponse) =>
    //                 this.toastrService.error(`Image download failed. Please try again later.`, `${error.statusText} ${error.status}`, )
    //         )
    //     );
    // }

    checkExpanded(tf: TfSnpModel, i: number): boolean {
        if (this.openedTfName) {
            return tf.name === this.openedTfName;
        } else {
            return i === 0;
        }
    }
}

