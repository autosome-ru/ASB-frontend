import {TemplateRef} from "@angular/core";

export type AsbTableColumnModel<T> = {
    [key in keyof Partial<T>]:
    | { view: string, valueConverter?: (value: T[key]) => string}
    | { view: string, template?: TemplateRef<{value: T[key]}>}

};

export type AsbTableDisplayedColumns<T> = Array<keyof T>;
