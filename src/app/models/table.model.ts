import {TemplateRef} from "@angular/core";
import {SortDirection} from "@angular/material/sort";
export type ColumnConfigModel<T, key extends keyof T> = {
        view: string,
        valueConverter?: (value: T[key]) => string,
        helpMessage?: string,
        disabledSort?: boolean,
        isSticky?: boolean,
        isDesc?: boolean,
        colorStyle?: (row: T) => string
    }
    | { view: string,
    columnTemplate: TemplateRef<{value: T[key], row?: T}>,
    helpMessage?: string,
    isSticky?: boolean,
    isDesc?: boolean,
    disabledSort?: boolean
};

export type AsbTableColumnModel<T> = {
    [key in keyof Partial<T>]: ColumnConfigModel<T, key>
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

