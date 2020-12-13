import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {getTextByStepNameAnanas} from "../../../helpers/text-helpers/tour.ananas.helper";
import { BreakpointObserver} from '@angular/cdk/layout';
import {Subscription} from "rxjs";

@Component({
  selector: 'asb-ananastra-header',
  templateUrl: './ananastra-header.component.html',
  styleUrls: ['./ananastra-header.component.less']
})
export class AnanastraHeaderComponent implements OnInit, OnDestroy {
    public searchGroup: FormGroup;
    searchOpened: boolean = false;
    private subscriptions = new Subscription()
    constructor(private formBuilder: FormBuilder, private router: Router,
                private changeDetectorRef: ChangeDetectorRef,
                private breakpointObserver: BreakpointObserver) {
    }

    ngOnInit(): void {
        this.searchGroup = this.formBuilder.group({search: ''});
        this.subscriptions.add(
            this.breakpointObserver.observe('(max-width: 765px)').subscribe(
                () => {
                    this.searchOpened = false;
                    this.changeDetectorRef.detectChanges()
                }
            )
        )
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    submit() {
        if (this.searchGroup.value.search) {
            this.router.navigateByUrl(`/ticket/${this.searchGroup.value.search}`)
        }
    }

    searchClicked() {
        if (this.searchOpened) {
            this.submit();
        } else {
            this.searchOpened = true;
        }
    }
    getTextByStepName(str: string) {
        return getTextByStepNameAnanas(str)
    }
}
