import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as fromActions from '../../../store/action';
import * as fromSelectors from 'src/app/store/selector';
import {AppState} from '../../../store/reducer';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AnnotationDataModel, AnnotationSnpModel} from 'src/app/models/annotation.model';
import {MatTabGroup} from '@angular/material/tabs';
import {TfOrCl} from '../../../models/data.model';
import {DownloadService} from 'src/app/services/download.service';
import {FileSaverService} from 'ngx-filesaver';

@Component({
  selector: 'astra-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TicketPageComponent implements OnInit, OnDestroy {
  @ViewChild('tabGroup')
  private tabGroup: MatTabGroup;
  public ticket: string;
  private intervalId: number = null;
  private subscriptions = new Subscription();
  public fileStatistics$: Observable<AnnotationDataModel>;
  public fileStatisticsLoading$: Observable<boolean>;
  public tfTableData$: Observable<{ data: AnnotationSnpModel[]; loading: boolean }>;
  public clTableData$: Observable<{ data: AnnotationSnpModel[]; loading: boolean }>;

  public tfTableDataSum$: Observable<{ data: AnnotationSnpModel[]; loading: boolean }>;
  public clTableDataSum$: Observable<{ data: AnnotationSnpModel[]; loading: boolean }>;

  public groupValue = false;
  private selectedTab: TfOrCl = 'tf';

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private downloadService: DownloadService,
              private fileSaverService: FileSaverService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap.subscribe(
        s => {
          this.ticket = s.get('id');
        }
      )
    );
    this.fileStatistics$ = this.store.select(
      fromSelectors.selectAnnotationDataById, this.ticket);
    this.fileStatisticsLoading$ = this.store.select(
      fromSelectors.selectAnnotationLoadingById, this.ticket);
    this.intervalId = window.setInterval(
      () => {
        this.store.dispatch(new fromActions.annotation.LoadAnnotationStatsAction(
          this.ticket));
      }, 500);
    this.subscriptions.add(
      this.fileStatisticsLoading$.subscribe(
        s => {
          if (s === false) {
            this.intervalId = this.clearInterval(this.intervalId);
            this.store.dispatch(new fromActions.annotation.LoadAnnotationStatsAction(
              this.ticket));
            this.subscriptions.add(
              this.fileStatistics$.subscribe(
                f => {
                  if (f && f.status === 'Processed') {
                    this.store.dispatch(new fromActions.annotation.InitAnnotationTableAction(
                      {tfOrCl: this.selectedTab, ticket: this.ticket, isExpanded: this.groupValue}
                    ));
                  }
                }
              )
            );
          }
        }
      )
    );
    this.tfTableData$ = this.store.select(fromSelectors.selectAnnotationTfTable, this.ticket);
    this.clTableData$ = this.store.select(fromSelectors.selectAnnotationClTable, this.ticket);
    this.tfTableDataSum$ = this.store.select(fromSelectors.selectAnnotationTfTableSum, this.ticket);
    this.clTableDataSum$ = this.store.select(fromSelectors.selectAnnotationClTableSum, this.ticket);

  }

  clearInterval(interval: number): null {
    if (interval) {
      window.clearInterval(interval);
      interval = null;
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.clearInterval(this.intervalId);
  }

  tabIndexChanged(index: number): void {
    this.selectedTab = index === 0 ? 'tf' : 'cl';
    this.initTableLoad();
  }

  groupValueChanged(event: boolean): void {
    this.groupValue = event;
    this.initTableLoad();
  }

  initTableLoad(): void {
    this.store.dispatch(new fromActions.annotation.InitAnnotationTableAction(
      {ticket: this.ticket,
        tfOrCl: this.selectedTab, isExpanded: this.groupValue}));
  }

  downloadTable(tfOrCl: TfOrCl): void {
    this.subscriptions.add(
      this.downloadService.downloadTable(this.ticket, tfOrCl, this.groupValue, 'tsv').subscribe(
        b => this.fileSaverService.save(b, `ananastra_${this.ticket}.tsv`)
      )
    );
  }
}
