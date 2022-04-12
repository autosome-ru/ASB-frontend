import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, Input,
    OnDestroy, OnInit, TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatExpansionPanel} from "@angular/material/expansion";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SeoModel} from "../../../models/seo.model";
import {SeoService} from "../../../services/seo.servise";
import {recentRelease} from "../../../helpers/constants/releases";
import {ReleaseModel} from "../../../models/releases.model";
import {demo1} from "../../../helpers/constants/demo.ananas";


type helpImages = 'enrichment' | 'summary' | 'table' | 'chromosomes' | 'concordance'
@Component({
    selector: 'asb-ananas-help',
    templateUrl: './ananas-help.component.html',
    styleUrls: ['./ananas-help.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnanasHelpComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('glossary')
    private glossary: MatExpansionPanel;

    @ViewChild('preview')
    private preview: TemplateRef<{ data: string }>
    private subscription = new Subscription();
    public fragment: string;
    @Input()
    public isAdastra: boolean
    public recentRelease: ReleaseModel;
    public rsIds: string;
    public vcfLines: string;

    constructor(private router: Router,
                public dialog: MatDialog,
                public seoService: SeoService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.rsIds = demo1.split('\n').slice(0, 6).join('\n')
        this.vcfLines = vcfFileLines
        this.recentRelease = recentRelease
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);

    }

    ngAfterViewInit(): void {
        this.openGlossary(this.route.snapshot.fragment)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    navigateToFragment(fragment: string) {
        this.router.navigate([],
            {relativeTo: this.route, fragment, replaceUrl: true}).then(
            () => {
                this.scrollToFragment()
            }
        )
    }

    openGlossary(fragment: string) {
        this.fragment = fragment
        if (this.fragment) {
            if (!this.glossary.expanded) {
                this.subscription = this.glossary.afterExpand.subscribe(
                    () => {
                        this.navigateToFragment(fragment);
                        this.subscription.unsubscribe();
                        this.subscription = new Subscription();
                    }
                )
                this.glossary.open()
            } else {
                this.navigateToFragment(fragment)
            }
        }
    }

    scrollToFragment() {
        const initialElement: HTMLElement = document.getElementById(this.route.snapshot.fragment);
        if (initialElement) {
            initialElement.scrollIntoView({behavior: "smooth"});
            initialElement.classList.add('theme-primary-border')
        }
    }

    openPreview(data: string) {
        this.dialog.open(this.preview, {data})
    }

    getNameOfId(data: helpImages): string {
        switch (data) {
            case 'enrichment':
                return 'ASB events related to particular TFs or cell types'
            case 'summary':
                return 'Summary'
            case 'table':
                return 'Complete table of ASBs found at user-submitted SNPs'
            case 'chromosomes':
                return 'Analysis of ASB enrichment at individual chromosomes'
            case 'concordance':
                return 'Visualization of ASB effect against binding motif predictions'
            default:
                return ''
        }
    }
}

const vcfFileLines: string = '#CHROM POS     ID        REF ALT    QUAL FILTER INFO                              FORMAT      NA00001        NA00002        NA00003\n' +
    'chr20     14370   rs6054257 G      A       29   PASS   NS=3;DP=14;AF=0.5;DB;H2           GT:GQ:DP:HQ 0|0:48:1:51,51 1|0:48:8:51,51 1/1:43:5:.,.\n' +
    'chr20     17330   .         T      A       3    q10    NS=3;DP=11;AF=0.017               GT:GQ:DP:HQ 0|0:49:3:58,50 0|1:3:5:65,3   0/0:41:3\n' +
    'chr20     1110696 rs6040355 A      G,T     67   PASS   NS=2;DP=10;AF=0.333,0.667;AA=T;DB GT:GQ:DP:HQ 1|2:21:6:23,27 2|1:2:0:18,2   2/2:35:4\n' +
    'chr20     1230237 .         T      .       47   PASS   NS=3;DP=13;AA=T                   GT:GQ:DP:HQ 0|0:54:7:56,60 0|0:48:4:51,51 0/0:61:2\n' +
    'chr20     1234567 microsat1 GTCT   G,GTACT 50   PASS   NS=3;DP=9;AA=G                    GT:GQ:DP    0/1:35:4       0/2:17:2       1/1:40:3'
