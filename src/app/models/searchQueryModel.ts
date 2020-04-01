import {SnpSearchBackendModel, SnpSearchModel} from "./data.model";

export type SearchByModel = "pos" | "cl" | "tf";
export const searchBy: SearchByModel[] = ["cl", "tf", "pos"];

export interface SearchQueryModel {
    searchInput: string;
    searchBy: "id" | "pos";
    chromosome: string;
    searchCl: string;
    searchTf: string;
    tfList: string[];
    clList: string[];
}

export interface SearchHintBackendModel {
    name: string;
    aggregated_snps_count: number;
}

export interface SearchHintModel {
    name: string;
    aggregatedSnpCount: number;
}

export interface SearchParamsModel {
    pos: string;
    rs: string;
    chr: string;
    by: string;
    cl: string;
    tf: string;
}

export interface SearchResultsModel {
    results: SnpSearchModel[];
    total: number;
}

export interface SearchResultsBackendModel {
    results: SnpSearchBackendModel[];
    total: number;
}
