import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AsbTableColumnModel, AsbTableDisplayedColumns} from '../../../../models/table.model';
import {AnnotationSnpModel} from '../../../../models/annotation.model';
import {TfOrCl} from '../../../../models/data.model';
import {MatSelectChange} from '@angular/material/select';
import {FormBuilder, FormControl} from '@angular/forms';
import {MatButtonToggleChange} from '@angular/material/button-toggle';


@Component({
  selector: 'astra-ticket-table-preview',
  templateUrl: './ticket-table-preview.component.html',
  styleUrls: ['./ticket-table-preview.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketTablePreviewComponent implements OnInit {
  @ViewChild("genomePositionViewTemplate", {static: true})
  private genomePositionViewTemplate: TemplateRef<{row: AnnotationSnpModel, value: any}>;
  @ViewChild('downloadSelectType')
  private downloadSelectTemplate: TemplateRef<any>;
  @ViewChild('fdrViewTemplate', {static: true})
  private fdrViewTemplate: TemplateRef<{value: number}>;
  @ViewChild('dbSnpViewTemplate', {static: true})
  private dbSnpViewTemplate: TemplateRef<{value: string}>;
  @Input()
  public data: AnnotationSnpModel[] = [];

  @Input()
  private tfOrCl: TfOrCl;

  @Input()
  public groupValue = false;

  @Output()
  private groupValueEmitter = new EventEmitter<boolean>();

  @Output()
  private downloadTableEmitter = new EventEmitter<void>();

  public displayedColumns: AsbTableDisplayedColumns<AnnotationSnpModel>;
  public columnModel: AsbTableColumnModel<AnnotationSnpModel>;
  public columnsControl: FormControl;
  colors: {[base: string]: string} = {
    A: "#0074FF",
    T: "#7900C8",
    G: "#FF4500",
    C: "#FFA500"};
  private initialDisplayedColumns: AsbTableDisplayedColumns<AnnotationSnpModel>;



  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.displayedColumns = ['rsId', 'chr'];
    this.columnModel = {
      rsId: {view: 'rs ID', columnTemplate: this.dbSnpViewTemplate},
      chr: {
        view: "Genome position",
        columnTemplate: this.genomePositionViewTemplate,
        disabledSort: true
      },
    };
    if (this.tfOrCl === 'tf') {
      this.displayedColumns = [
        ...this.displayedColumns,
        'transcriptionFactor',
        'aggregatedCellTypes'
      ];
      this.columnModel = {
        ...this.columnModel,
        transcriptionFactor: {view: 'Transcription factor'},
        aggregatedCellTypes: {view: 'Cell types', disabledSort: true}
      };
    } else {
      this.displayedColumns = [
        ...this.displayedColumns,
        'cellType',
        'aggregatedTFs'
      ];
      this.columnModel = {
        ...this.columnModel,
        cellType: {view: 'Cell type'},
        aggregatedTFs: {view: 'TFs'}
      };
    }
    this.displayedColumns.push('fdrRef', 'fdrAlt');
    this.columnModel = {
      ...this.columnModel,
      fdrRef: {
        view: (this.groupValue ? '' : 'Best ') + 'FDR Ref',
        columnTemplate: this.fdrViewTemplate},
      fdrAlt: {
        view: (this.groupValue ? '' : 'Best ') + 'FDR Alt',
        columnTemplate: this.fdrViewTemplate}
    };
    this.columnsControl = this.formBuilder.control(this.displayedColumns);
    this.initialDisplayedColumns = this.displayedColumns;

  }

  _resetFilters(): void {
    this.displayedColumns = this.initialDisplayedColumns;
    this.columnsControl.patchValue(this.initialDisplayedColumns);
  }

  _changeColumns(event: MatSelectChange): void {
    this.displayedColumns = [
      ...event.value
    ];
  }

  _groupToggled(event: MatButtonToggleChange): void {
    this.groupValue = event.value;
    this.groupValueEmitter.emit(this.groupValue);
  }

  // chooseFormat(format: string): void {
  // }

  downloadTable(): void {
    this.downloadTableEmitter.emit();
  }
}
