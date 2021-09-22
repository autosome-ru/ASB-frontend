import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UploadService} from 'src/app/services/upload.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as fromActions from 'src/app/store/action/ananastra';
import {AnnotationStoreState} from 'src/app/store/reducer/ananastra';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {demo1, demo2} from "../../../../helpers/constants/demo.ananas";
import {getTextByStepNameAnanas} from "../../../../helpers/text-helpers/tour.ananas.helper";
import {ToastrService} from "ngx-toastr";
import {esOptions, fdrOptions} from "../../../../helpers/constants/constants";
import {BackgroundSelect} from "../../../../models/annotation.model";

@Component({
  selector: 'astra-upload-file-component',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFileComponent implements OnInit, OnDestroy {
  @ViewChild('fileDropRef')
  private fileDropRef: HTMLInputElement;
  public fileProgress$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  private subscriptions = new Subscription();
  private ticket: string;
  private firstSubmit: boolean = true;
  public file = null;
  public isHovered: boolean;
  public formGroup: FormGroup;
  public fdrOptions: string[] = fdrOptions.filter(d => d != '0.25');
  public esOptions: string[] = esOptions;
  public backgroundOptions: BackgroundSelect[] = ['WG', 'LD-EUR', 'LD-AFR', 'LD-ASN', 'LOCAL' ]

  constructor(private uploadService: UploadService,
              private store: Store<AnnotationStoreState>,
              private router: Router,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
        textArea: '',
        fdr: '0.05',
        background: 'WG',
        es: '0'
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  fileDropped($event: FileList): void {
    this.prepareFileList($event);
  }

  fileBrowseHandler(files: FileList): void {
    this.prepareFileList(files);
  }


  deleteFile(): void {
    if (this.file) {
      this.file = null;
      if (this.ticket) {
        this.uploadService.deleteFile(this.ticket).subscribe(
          () => null,
          error => console.error(error)
        );
        this.ticket = null;
      }
      this.reinitSubscription();
    }
  }
  reinitSubscription() {
      this.subscriptions.unsubscribe();
      this.subscriptions = new Subscription();
  }
  uploadFile(file: File, forceRedirect?: boolean): void {
    this.fileProgress$.next(0);
    this.subscriptions.add(
      this.uploadService.getFileTicket().subscribe(
        s => {
            if (s  && this.ticket !== s) {
                this.ticket = s;
                if (forceRedirect && this.ticket) {
                    this.annotationStart();
                }
            }
        }
      )
    );
    const formData = new FormData();
    formData.append('file', file);
    this.subscriptions.add(
      this.uploadService.uploadFile(file, formData).subscribe(
        percent => this.fileProgress$.next(percent),
          () => this.fileProgress$.next(null)
      )
    );
  }
  prepareFileList(files: FileList): void {
    if (files.length > 0) {
      this.deleteFile();
      this.file = Object.defineProperty(files[0], 'progress', {value: 0});
    }
    this.uploadFile(this.file);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  annotationStart(): void {
    this.router.navigateByUrl(`/ticket/${this.ticket}`).then(
      () => {
          this.store.dispatch(new fromActions.annotation.InitAnnotationStartAction(
              {ticket: this.ticket,
                  ...this.formGroup.value
              }));
          this.uploadService.removeFileTicket()
      }
    );
  }

  submit(): void {
      const loc = () => {
          const value = this.formGroup.get('textArea').value
          if (!!value) {
              this.firstSubmit = false;
              const file = new File([value], 'my-list.txt');
              this.uploadFile(file, true);
          } else {
              this.toastr.warning('No data provided', 'Warning')
          }
      }
    if ((this.ticket && this.file) || this.firstSubmit) {
        if (this.fileProgress$.value == 100 && this.ticket) {
            this.firstSubmit = false;
            this.annotationStart();
        } else {
            if (this.fileProgress$.value == null) {
                if (this.file) {
                    this.toastr.error('The file failed to load', 'Error')
                } else {
                    loc()
                }
            } else {
                this.toastr.warning('The file is still loading', 'Warning')
            }
        }
    } else {
        loc()
    }

  }

    initDemo(id: number) {
      let patchValue: string;
      switch (id) {
          case 1:
              patchValue = demo1;
              break;
          case 2:
              patchValue = demo2;
              break;
          case 3:
              patchValue = demo2;
              break;
      }
      this.formGroup.patchValue({textArea: patchValue});
    }

    getTextByStepName(str: string) {
        return getTextByStepNameAnanas(str);
    }

    backgroundChanged(isHovered: boolean) {
        this.isHovered = isHovered
    }

    countStrings(value: string): number {
        return value.trim().split('\n').length
    }

    optionToView(option: BackgroundSelect) {
        switch (option) {
            case 'LD-EUR':
                return 'LD-islands (EUR)'
            case 'LD-ASN':
                return 'LD-islands (ASN)'
            case 'LD-AFR':
                return 'LD-islands (AFR)'
            case 'LOCAL':
                return 'Local (1 Mbase)'
            case 'WG':
                return 'Whole genome'
        }
    }
}
