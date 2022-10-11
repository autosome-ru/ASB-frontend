import { Directive, HostListener } from '@angular/core';
import { NgControl } from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Directive({
    selector: 'input,textarea[onlyUTF8]'
})
export class OnlyLatinDirective {
    constructor(private control: NgControl,
                private toastService: ToastrService) {}

    public strRegExp = /[^\x00-\x7F]+/g;

    @HostListener('input', ['$event'])
    public inputChange(evt: KeyboardEvent): void {
        const input = evt.target as HTMLInputElement;
        const match = input.value.match(this.strRegExp)
        if (match && match[0]) {
            this.toastService.warning('Non utf-8 text has been ignored',
                'Warning', {timeOut: 10000})
            input.value = this.replaceStr(input.value)
            this.control.control.patchValue(input.value)
            this.control.control.setErrors({'Wrong value': true})
        }
    }

    replaceStr(str: string): string {
        console.log(str, str.replace(this.strRegExp, ''))
        return str.replace(this.strRegExp, '')
    }

}
