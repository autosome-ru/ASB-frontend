import {TemplateRef} from "@angular/core";

export type AsbTableColumnModel<T> = {
    [key in keyof Partial<T>]:
    | { view: string, valueConverter?: (value: T[key]) => string, sticky?: boolean }
    | { view: string, template: TemplateRef<{value: T[key]}>, sticky?: boolean }

};

export type AsbTableDisplayedColumns<T> = Array<keyof T>;
