import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatExpansionPanel} from "@angular/material/expansion";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'asb-ananas-help',
    templateUrl: './ananas-help.component.html',
    styleUrls: ['./ananas-help.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnanasHelpComponent implements AfterViewInit, OnDestroy {
    @ViewChild('glossary')
    private glossary: MatExpansionPanel;
    private subscription = new Subscription();
    public fragment: string;

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    ngAfterViewInit(): void {
        this.openGlossary(this.route.snapshot.fragment)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    openGlossary(fragment: string) {
        this.fragment = fragment
        if (this.fragment) {
            if (!this.glossary.expanded) {
                this.subscription = this.glossary._bodyAnimationDone.subscribe(
                    () => {

                        this.router.navigate([],
                            {relativeTo: this.route, fragment, replaceUrl: true}).then(
                            () => {
                                this.subscription.unsubscribe();
                                this.scrollToFragment()
                            }
                        )

                    }
                )
                this.glossary.open()
            } else {
                this.scrollToFragment()
            }
        }
    }

    scrollToFragment() {
        const initialElement: HTMLElement = document.getElementById(this.route.snapshot.fragment);
        if (initialElement) {
            initialElement.scrollIntoView({behavior: "smooth"});
        }
    }
}
