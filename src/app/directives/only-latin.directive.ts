import { Directive, HostListener } from '@angular/core';
import { NgControl } from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Directive({
    selector: 'input[onlyLatin]'
})
export class OnlyLatinDirective {
    constructor(private control: NgControl,
                private toastService: ToastrService) {}

    public strRegExp = /[^a-zA-Z0-9]+/g

    @HostListener('input', ['$event'])
    public inputChange(evt: KeyboardEvent): void {
        const input = evt.target as HTMLInputElement;
        const match = input.value.match(this.strRegExp)
        if (match && match[0]) {
            this.toastService.warning('Non latin text has been ignored',
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
