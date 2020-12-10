import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MediaMatcher} from "@angular/cdk/layout";
import {getTextByStepNameAnanas} from "../../../helpers/text-helpers/tour.ananas.helper";

@Component({
  selector: 'asb-ananastra-header',
  templateUrl: './ananastra-header.component.html',
  styleUrls: ['./ananastra-header.component.less']
})
export class AnanastraHeaderComponent implements OnInit {
    public searchGroup: FormGroup;
    searchOpened: boolean = false;
    mdq: MediaQueryList;
    mediaQueryListener:()=>void;

    constructor(private formBuilder: FormBuilder, private router: Router,
                changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mdq = media.matchMedia('(max-width: 765px)');
        this.mediaQueryListener = () => {

            if (!this.mdq.matches) {
                this.searchOpened = false;
            }
            changeDetectorRef.detectChanges();
        }
        this.mdq.addEventListener('change', this.mediaQueryListener);
    }

    ngOnInit(): void {
        this.searchGroup = this.formBuilder.group({search: ''})
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
