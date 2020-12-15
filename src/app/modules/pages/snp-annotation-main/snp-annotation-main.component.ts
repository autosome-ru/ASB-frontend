import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {SeoService} from "../../../services/seo.servise";
import {ActivatedRoute} from "@angular/router";
import {SeoModel} from "../../../models/seo.model";

@Component({
    selector: 'astra-snp-annotation-main',
    templateUrl: './snp-annotation-main.component.html',
    styleUrls: ['./snp-annotation-main.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnpAnnotationMainComponent implements OnInit, OnDestroy {
    @ViewChild('logo')
    private logo: ElementRef<HTMLImageElement>;

    public steps: string[] = ['text-input', 'file-drop', 'examples', 'job'];
    public text: string = 'This webserver annotates a given list of SNPs with allele-specific binding events across' +
        ' a wide range of transcription factors and cell types\nusing ADASTRA that is constructed through the meta-analysis of more than 15000 ChIP-Seq experiments.';
    private rotationAngle: number = 0;

    constructor(private seoService: SeoService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
    }

    ngOnDestroy() {
    }

    logoClicked() {
        if (!this.logo.nativeElement.style.transform) {
            this.rotationAngle = 360
        } else {
            this.rotationAngle += 360
        }
        this.logo.nativeElement.style.transform = `rotate(${this.rotationAngle}deg)`
    }
}
