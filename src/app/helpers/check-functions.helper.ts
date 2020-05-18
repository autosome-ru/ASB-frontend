import {SearchParamsModel, SearchQueryModel} from "../models/searchQueryModel";
import {phenotypesFormToList} from "./search-model.converter";
import {SnpSearchModel} from "../models/data.model";

export function getPaginatorOptions(len: number): number[] {
    return len > 50 ?
        [5, 10, 25, 50, len] :
        [5, 10, 25, 50];
}

export function checkIfNumberOrFrac(data: string ) {
    if (data.match(/^\d+$/)) {
        return Number(data);
    }
    if (data.match(/^\d+\/\d+$/)) {
        const twoNums: string[] = data.split("/");
        return Number(twoNums[0]) / Number(twoNums[1]);
    }
    return data;
}


export function isValidPosInterval(search: string): boolean {
    if (search.match(/^\d+-\d+$/)) {
        const posArray: string[] = search.split("-");
        if (posArray.length === 2) {
            return true;
        }
    }
    return false;
}

export function checkOneResult(searchData: SnpSearchModel[]): boolean {
    return !!(searchData &&
        searchData.length > 0 && searchData.length < 4
        && searchData.reduce((a, b) =>
            a.pos === b.pos && a.chr === b.chr ?
                b : {chr: "chr0", pos: 0}, searchData[0]).pos);
}

export function convertFormToParams(form: SearchQueryModel, oldIsAdvanced?: boolean,
                                    searchData?: SnpSearchModel[]): Partial<SearchParamsModel> {
    if (form && !form.isAdvanced) {
        if (form && form.searchBy) {
            if (form.searchBy === "pos" || form.isAdvanced !== oldIsAdvanced) {
                if (form.searchInput) {
                    return {
                        pos: form.searchInput,
                        chr: form.chromosome,
                    };
                }  else return {};
            } else {
                return form.searchInput ? {rs: form.searchInput} : {};
            }

        } else {
            return form.searchInput ? {pos: form.searchInput, chr: form.chromosome} : {};
        }

    } else {
        if (form) {
            const result: Partial<SearchParamsModel> = {};
            if (form.clList.length > 0) result.cl = form.clList.join(",");
            if (form.searchInput) {
                if (checkOneResult(searchData) &&
                    !isValidPosInterval(form.searchInput)) {
                    result.pos = "" + searchData[0].pos;
                    result.chr = searchData[0].chr;
                } else {
                    result.pos = form.searchInput;
                    result.chr = form.chromosome;
                }
            } else if (form.chromosome && form.chromosome !== "any chr") {
                result.chr = form.chromosome;
            }
            if (form.tfList.length > 0) result.tf = form.tfList.join(",");
            const phenList: string = phenotypesFormToList(form);
            if (phenList) {
                result.phe_db = phenList;
            }
            return result;
        } else return {};
    }
}
