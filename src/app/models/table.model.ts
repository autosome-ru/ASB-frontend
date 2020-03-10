import {TemplateRef} from "@angular/core";

export type AsbTableColumnModel<T> = {
    [key in keyof Partial<T>]:
    | { view: string, valueConverter?: (value: T[key]) => string, helpMessage?: string}
    | { view: string, template?: TemplateRef<{value: T[key]}>, helpMessage?: string}


};

export type AsbTableDisplayedColumns<T> = Array<keyof T>;
