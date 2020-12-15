import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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
export class AnanasHelpComponent implements OnInit, OnDestroy {
    @ViewChild('glossary')
    private glossary: MatExpansionPanel;
    private subscription = new Subscription();
    public fragmentOpened: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

    openGlossary(fragment: string) {
        this.fragmentOpened = true;
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
        }
        else {
            this.scrollToFragment()
        }
    }

    scrollToFragment() {
        const initialElement: HTMLElement = document.getElementById(this.route.snapshot.fragment);
        if (initialElement) {
            initialElement.scrollIntoView({behavior: "smooth"});
        }
    }
}
