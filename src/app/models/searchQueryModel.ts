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
