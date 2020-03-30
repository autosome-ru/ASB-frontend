export type SearchByModel = "pos" | "cl" | "tf";


export interface SearchQueryModel {
    searchInput: string;
    searchBy: "id" | "pos";
    chromosome: string;
    searchByArray: SearchByModel[];
    searchCl: string;
    searchTf: string;
    tfList: string[];
    clList: string[];
    // inCL: boolean;
    // inTF: boolean;
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
