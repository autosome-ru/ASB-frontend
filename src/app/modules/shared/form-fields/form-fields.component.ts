import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    HostBinding,
    Inject,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import {
    AbstractControl,
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NG_VALUE_ACCESSOR,
    NgControl,
} from "@angular/forms";
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {Subject, Subscription} from "rxjs";
import {FocusMonitor} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {isValidPosInterval} from "../../../helpers/helper/check-functions.helper";

export class ChromPos {
    constructor(public chr: string, public pos: string) {
    }
}

function isValidChromosome(chromosome: string): boolean {
    return !!chromosome.match(/^([1-9]|1\d|2[0-2]|X|Y)$/);
}

export function validateGroup(form: FormGroup) {
    const formValue = form.value as ChromPos;
    if (formValue) {
        if (formValue.chr) {
            if (!isValidChromosome(formValue.chr)) {
                return {badChr: true};
            }
            if (formValue.pos) {
                if (formValue.pos.match(/^\d+$/)) {
                    return null;
                } else {
                    if (isValidPosInterval(formValue.pos)) {
                        const [startPos, endPos] = formValue.pos.split("-");
                        if ((Number(startPos) || startPos === "0") && (Number(endPos) || endPos === "0")) {
                            if (Number(startPos) > Number(endPos) || endPos === "0") {
                                return {
                                    greater: true
                                };
                            } else {
                                return;
                            }
                        }
                    } else {
                        return {wrongPos: true};
                    }
                }
            }
        }
        if (formValue.pos && !formValue.chr) {
            return {noChr: true};
        }
    }
    return null;
}

@Component({
    selector: "asb-chr-pos-field",
    templateUrl: "./form-fields.component.html",
    styleUrls: ["./form-fields.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AsbChrPosInputComponent),
            multi: true
        },
        {
            provide: MatFormFieldControl,
            useExisting: AsbChrPosInputComponent,
            multi: true
        }
    ],
    host: {
        "[class.example-floating]": "shouldLabelFloat",
        "[id]": "id",
    }
})
export class AsbChrPosInputComponent implements OnInit,
    OnDestroy, ControlValueAccessor, MatFormFieldControl<ChromPos> {


    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.chromPos.disable() : this.chromPos.enable();
        this.stateChanges.next();
    }

    @HostBinding("class.floating")
    get shouldLabelFloat() {
        return true;
    }

    @Input()
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(plh) {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    get errorState(): boolean {
        return this.chromPos.invalid && this.chromPos.dirty;
    }

    @Input()
    get value(): ChromPos | null {
        const n = this.chromPos.value as ChromPos;
        return new ChromPos(n.chr.trim() || "", n.pos.trim() || "");
    }
    set value(chrPos: ChromPos | null) {
        chrPos = chrPos || new ChromPos("", "");
        this.chromPos.setValue({
            chr: chrPos.chr || "",
            pos: chrPos.pos || ""
        });
        this.onChange(chrPos);
        this.stateChanges.next();
    }

    @Input()
    get required() {
        return this._required;
    }
    set required(req) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }

    get empty() {
        const n = this.chromPos.value as ChromPos;
        return !n.chr && !n.pos;
    }
    constructor(private formBuilder: FormBuilder,
                private _focusMonitor: FocusMonitor,
                public injector: Injector,
                @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
                private elRef: ElementRef<HTMLElement>) {
    }
    static nextId = 0;
    controlType = "asb-chr-pos-field";
    private subscriptions = new Subscription();

    @HostBinding()
    id = `asb-chr-pos-field-${AsbChrPosInputComponent.nextId++}`;
    stateChanges = new Subject<void>();
    private previousPos = "";

    @ViewChild("pos")
    private posInput: HTMLInputElement;
    private _disabled = false;

    @Input("aria-describedby")
    userAriaDescribedBy: string;
    private _placeholder: string;
    private _required = false;
    focused = false;
    ngControl: NgControl;

    chromPos: FormGroup;

    onChange = (_: any) => {};
    onTouched = () => {};


    writeValue(chromPos: ChromPos | null): void {
        this.value = chromPos;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDescribedByIds(ids: string[]) {
        const controlElement = this.elRef.nativeElement
            .querySelector(".input-container");
        controlElement.setAttribute("aria-describedby", ids.join(" "));

    }

    onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() != "input") {
            this.elRef.nativeElement.querySelectorAll("input")[0].focus();
        }
    }

    ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) {
        this.ngControl.valueAccessor = this;
    }
    this.subscriptions.add(
        this._focusMonitor.monitor(this.elRef, true).subscribe(
            origin => {
            if (this.focused && !origin) {
                this.onTouched();
            }
            this.focused = !!origin;
            this.stateChanges.next();
        })
    );
    this.chromPos =  this.formBuilder.group({
        pos: [""],
        chr: [""]
        },
        {validators: validateGroup}
    );
    this.subscriptions.add(
        this.chromPos.get("pos").valueChanges.subscribe(
            (s: string) => {
                if (s.trim().length != s.length) {
                    this.chromPos.patchValue({pos: s.trim()})
                }
                if (!!s) {
                    this.previousPos = s;
                }
                this.patchGroupOnPaste(s);
                }
        )
    );
    this.subscriptions.add(
        this.chromPos.get("chr").valueChanges.subscribe(
            (s: string) => {
            if (s.length > 1 && s.match(/^0\d$/)) {
                this.chromPos.patchValue({chr: s.slice(1)});
                this._focusMonitor.focusVia(this.posInput, "program");
            }
            this.patchGroupOnPaste(s, "chr");
            }
        )
    );

    }
    patchGroupOnPaste(s: string, from?: keyof ChromPos) {
        if (s && s.includes(":")) {
            const sList = s.trim().split(":");
            if (!sList[0]) {
                sList[0] = this.chromPos.value.chr;
            }
            if (!!sList[0] && !sList[1] && from == "chr") {
               this._focusMonitor.focusVia(this.posInput, "program");
            }
            this.chromPos.patchValue({chr: sList[0], pos: sList[1]});
        }
    }
    autoFocusNext(control: AbstractControl, type?: keyof ChromPos, nextElement?: HTMLInputElement): void {
        if (!control.errors && type == "chr" && !this.chromPos.get("pos").value && control.value.length == 2 && nextElement) {
            control.patchValue(control.value.trim(), {emitEvent: false})
            this._focusMonitor.focusVia(nextElement, "program");
        }
    }

    autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
        if (control.value.length < 1 && this.previousPos.length < 1) {
            this._focusMonitor.focusVia(prevElement, "program");
        }
        this.previousPos = control.value;
    }
    ngOnDestroy() {
        this.stateChanges.complete();
        this.subscriptions.unsubscribe();
        this._focusMonitor.stopMonitoring(this.elRef.nativeElement);
    }

    _handleInput(control: AbstractControl, type?: keyof ChromPos, nextElement?: HTMLInputElement): void {
        this.autoFocusNext(control, type, nextElement);
        this.onChange(this.value);
    }
}
