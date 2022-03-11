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

    constructor(private router: Router,
                public dialog: MatDialog,
                public seoService: SeoService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
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

    getNameOfId(data: string): string {
        switch (data) {
            case 'enrichment':
                return 'ASB events related to particular TFs or cell types'
            case 'summary':
                return 'Summary'
            case 'table':
                return 'Complete table of ASBs found at user-submitted SNPs'
            case 'chromosomes':
                return 'Analysis of ASB enrichment at individual chromosomes'
            default:
                return ''
        }
    }
}
