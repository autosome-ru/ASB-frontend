import {TemplateRef} from "@angular/core";

export type AsbTableColumnModel<T> = {
    [key in keyof Partial<T>]:
    | { view: string, valueConverter?: (value: T[key]) => string, helpMessage?: string, disabledSort?: boolean}
    | { view: string, columnTemplate: TemplateRef<{value: T[key]}>, helpMessage?: string, disabledSort?: boolean}
};

export type AsbTableDisplayedColumns<T> = Array<keyof T>;
