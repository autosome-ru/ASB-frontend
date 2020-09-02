import {SearchParamsModel, SearchQueryModel} from "../../models/searchQueryModel";
import {formCheckboxesToList} from "../converter/search-model.converter";
import {SnpSearchModel, TfSnpModel} from "../../models/data.model";
import {MatSort} from "@angular/material/sort";
import {compareConcordance} from "../constants/constants";

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
    search = search.trim()
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
            if (form.searchBy === "pos" || (oldIsAdvanced && form.isAdvanced !== oldIsAdvanced)) {
                if (form.searchInput) {
                    return {
                        pos: form.searchInput.trim(),
                        chr: form.chromosome,
                    };
                }  else return {};
            } else {
                return form.searchInput ? {rs: form.searchInput.trim()} : {};
            }

        } else {
            return form.searchInput ? {pos: form.searchInput.trim(), chr: form.chromosome} : {};
        }

    } else {
        if (form) {
            const result: Partial<SearchParamsModel> = {};
            if (form.clList.length > 0) result.cl = form.clList.join(",");
            if (form.searchInput) {
                if (checkOneResult(searchData) &&
                    !isValidPosInterval(form.searchInput.trim())) {
                    result.pos = "" + searchData[0].pos;
                    result.chr = searchData[0].chr;
                } else {
                    result.pos = form.searchInput.trim();
                    result.chr = form.chromosome;
                }
            } else if (form.chromosome && form.chromosome !== "any chr") {
                result.chr = form.chromosome;
            }
            if (form.tfList.length > 0) result.tf = form.tfList.join(",");
            const phenList: string = formCheckboxesToList(form);
            if (phenList) {
                result.phe_db = phenList;
            }
            const concList: string = formCheckboxesToList(form, "concordance");
            if (concList) {
                result.motif_conc = concList
            }
            return result;
        } else return {};
    }
}

function applyFunction(a: string | number, b: string | number, isBadElem: ((x: string | number) => boolean)): number {
    if (isBadElem(a) && isBadElem(b)) {
        return 0
    } else {
        if (isBadElem(a)) {
            return 1
        } else {
            return -1
        }
    }
}

export function compareData(a: TfSnpModel, b: TfSnpModel, sort: MatSort): number {
    let result: number = 0
    if (sort.active) {
        if (a[sort.active] && b[sort.active]) {
            if (sort.active == "motifConcordance") {
                if (a.motifConcordance != 'No Hit' && b.motifConcordance != 'No Hit') {
                    result = compareConcordance(a.motifConcordance, b.motifConcordance)
                } else {
                    return applyFunction(a.motifConcordance, b.motifConcordance,
                        x => x == 'No Hit' )
                }

            } else {
                result = a[sort.active] > b[sort.active] ? 1 : -1
            }
        } else {
            return applyFunction(a[sort.active], b[sort.active], x => !x)
        }
    }
    return result * (sort.direction == 'asc' ? 1 : -1)
}
