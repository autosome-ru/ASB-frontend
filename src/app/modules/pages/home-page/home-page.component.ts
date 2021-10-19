import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {AppState} from "../../../store/reducer/adastra";
import * as fromSelectors from "src/app/store/selector/adastra";
import {Store} from "@ngrx/store";
import * as fromActions from "src/app/store/action/adastra";
import {TotalInfoModel} from "../../../models/data.model";
import {Observable} from "rxjs";
import {SeoModel} from "../../../models/seo.model";
import {SeoService} from "../../../services/seo.servise";
import {ReleaseModel} from "../../../models/releases.model";
import {ReleasesService} from "../../../services/releases.service";

@Component({
    selector: "home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: [ "./home-page.component.less" ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit, OnDestroy {
    @HostBinding("class.asb-home")
    private readonly cssClass = true;
    @ViewChild("svgContainer", {static: true})
    public svgContainer: ElementRef<HTMLObjectElement>;

    @ViewChild('winnersLink', {static: true})
    public winnersLink: ElementRef<HTMLObjectElement>
    isBrowser: boolean;
    public totalInfo$: Observable<TotalInfoModel>;
    public release$: Observable<ReleaseModel>;
    public tourSteps: string[];
    public totalInfoLoading$: Observable<boolean>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private seoService: SeoService,
                private releaseService: ReleasesService,
                @Inject(PLATFORM_ID) private platformId: Object) {
                        this.isBrowser = isPlatformBrowser(this.platformId);
    }


    ngOnInit() {
        this.seoService.updateSeoInfo(this.route.snapshot.data as SeoModel);
        this.release$ = this.store.select(fromSelectors.selectCurrentRelease);
        this.totalInfo$ = this.store.select(fromSelectors.selectTotalInfo);
        this.totalInfoLoading$ = this.store.select(fromSelectors.selectTotalInfoLoading);

        this.store.dispatch(new fromActions.data.InitTotalInfoAction());
        if (this.isBrowser) {
            document.addEventListener("mousemove",
                event => {
                    const ded = this.svgContainer.nativeElement.contentDocument;
                    const headerHeight = 56;
                    if (ded) {
                        const dedWidth: number = this.svgContainer.nativeElement.offsetWidth;
                        const marginLeft: number = (document.documentElement.offsetWidth - dedWidth) / 2;
                        const leftEye = ded.getElementById("path1538");
                        function moveEye(eye: HTMLElement, centerX: number, centerY: number) {
                            const angleLeft = Math.atan2((event.y - (eye.getBoundingClientRect().y + headerHeight)), (event.x - (eye.getBoundingClientRect().x + marginLeft)));
                            eye.setAttribute("cx", "" + (centerX + Math.cos(angleLeft)));
                            eye.setAttribute("cy", "" + (centerY + Math.sin(angleLeft) / 2));
                        }
                        if (leftEye) {
                            const leftEyeCenterX = 87.507666;
                            const leftEyeCenterY = 127.65275;
                            moveEye(leftEye, leftEyeCenterX, leftEyeCenterY);
                        }
                        const rightEye = ded.getElementById("path1538-7");
                        if (rightEye) {
                            const rightEyeCenterX = 129.68616;
                            const rightEyeCenterY = 100.84577;
                            moveEye(rightEye, rightEyeCenterX, rightEyeCenterY);
                        }

                    }
                });
            // this.winnersLink.nativeElement.classList.add('fireworks')
        }
        this.tourSteps = [
            "search-by",
            "search-rs",
            'search-gene'
        ];
        const releaseVersion = this.releaseService.getReleaseFromFullPath().majorVersion
        if (releaseVersion >= 3) {
            this.tourSteps.push('search-eqtl')
        }
        this.tourSteps.push('search-pos')
        if (releaseVersion >= 3) {
            this.tourSteps.push('fdr-simple', 'effect-size')
        }
        this.tourSteps.push("search-example", 'switch-release')

    }

    ngOnDestroy() {

    }

    constructTooltipText(info: TotalInfoModel, version: number) {
        if (version === 3) {
            return `${info.asbsCount005} ASBs passing 5% FDR at ${info.snpsCount005} SNPs
        ${info.asbsCount} ASBs passing 25% FDR at ${info.snpsCount} SNPs`
        } else {
            return `${info.asbsCount010} ASBs passing 10% FDR at ${info.snpsCount010} SNPs
        ${info.asbsCount} ASBs passing 25% FDR at ${info.snpsCount} SNPs`
        }

    }
}
