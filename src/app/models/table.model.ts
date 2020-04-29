import {TemplateRef} from "@angular/core";
import {SortDirection} from "@angular/material/sort";

export type AsbTableColumnModel<T> = {
    [key in keyof Partial<T>]:
    | { view: string,
    valueConverter?: (value: T[key]) => string,
    helpMessage?: string,
    disabledSort?: boolean,
    colorStyle?: (row: T) => string}
    | { view: string,
    columnTemplate: TemplateRef<{value: T[key]}>,
    helpMessage?: string, disabledSort?: boolean}
};

export type AsbTableDisplayedColumns<T> = Array<keyof T>;

export interface AsbServerSideModel {
    pageIndex: number;
    pageSize: number;
    direction: SortDirection;
    active: string;
}

export interface AsbServerSideBackendModel {
    page: string;
    size: string;
    order_by?: string;
    [name: string]: string;
}

