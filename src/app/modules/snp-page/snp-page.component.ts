import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Observable, Subject} from "rxjs";
import {SnpInfoModel, TfSnpModel} from "src/app/models/data.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/reducer";
import * as fromSelectors from "src/app/store/selector";
import * as fromActions from "src/app/store/action";
import {AsbTableComponent} from "src/app/modules/helpers/table-template/table.component";


@Component({
    selector: 'asb-snp-page',
    templateUrl: './snp-page.component.html',
    styleUrls: ['./snp-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Emulated,
})
export class SnpPageComponent implements OnInit, OnDestroy {
    @ViewChild("tableView", {static: true})
    public tableView: AsbTableComponent<TfSnpModel>;


    public id: string = "";
    public snpData$: Observable<SnpInfoModel>;
    public snpDataLoading$: Observable<boolean>;
    private destroy$ = new Subject<void>();

    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private titleService: Title) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.destroy$ = null;
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get("id");
        this.titleService.setTitle(this.route.snapshot.data.title + this.id);

        this.snpData$ = this.store.select(fromSelectors.selectSnpInfoData);
        this.snpDataLoading$ = this.store.select(fromSelectors.selectSnpInfoDataLoading);
        this.store.dispatch(new fromActions.data.LoadSnpInfoAction({id: this.id}))
    }




}
