import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {SnpInfoModel} from "src/app/models/data.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";

@Component({
  selector: 'asb-snp-page',
  templateUrl: './snp-page.component.html',
  styleUrls: ['./snp-page.component.less']
})
export class SnpPageComponent implements OnInit {

    public id: string = "";
    public snpData$: Observable<SnpInfoModel>;
    public snpDataLoading$: Observable<boolean>;

    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private titleService: Title) {}

    ngOnInit() {
        this.snpData$ = this.store.select(fromSelectors.selectSnpInfoData);
        this.snpDataLoading$ = this.store.select(fromSelectors.selectSnpInfoDataLoading);
        this.id = this.route.snapshot.paramMap.get("id");
        this.titleService.setTitle(this.route.snapshot.data.title + this.id);
        this.store.dispatch(new fromActions.data.LoadSnpInfoAction({id: this.id}))
    }

}
