export interface SearchQueryModel {
    searchInput: string;
    searchBy: "id" | "pos";
    chromosome?: string;
    // inCL: boolean;
    // inTF: boolean;
}
