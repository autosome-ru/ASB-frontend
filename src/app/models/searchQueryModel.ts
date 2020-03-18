export interface SearchQueryModel {
    searchInput: string;
    searchBy: "id" | "pos";
    chromosome: string;
    searchByArray: ("id" | "pos" | "cl" | "tf")[];
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


