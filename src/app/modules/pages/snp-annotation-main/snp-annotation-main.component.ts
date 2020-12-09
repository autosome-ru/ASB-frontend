import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
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
export class SnpAnnotationMainComponent implements OnInit {
    steps: string[] = ['text-input', 'file-drop', 'examples'];

    constructor(private seoService: SeoService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
    }
}
