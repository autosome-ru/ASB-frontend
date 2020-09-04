import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { searchOptionsUrl, searchSnpsResultsUrl} from "src/app/helpers/constants/urls";
import {
    SearchHintBackendModel,
    SearchQueryModel, SearchResultsBackendModel,
} from "../models/search-query.model";
import {formCheckboxesToList} from "../helpers/converter/search-model.converter";
import {AsbServerSideModel} from "../models/table.model";
import {convertServerSideModelToServerSideBackendModel} from "../helpers/converter/snp-model.converter";


@Injectable()
export class SearchService {

    constructor(private http: HttpClient) {
    }

    public getSearchOptions(filter: SearchQueryModel, tfOrCl: "tf" | "cl"):
        Observable<SearchHintBackendModel[]> {
        let params: {[id: string]: string};

        if (tfOrCl === "tf") {
            params = makeParamsForSearchOptions(tfOrCl, filter.tfList, filter.searchTf);
        } else {
            params = makeParamsForSearchOptions(tfOrCl, filter.clList, filter.searchCl);
        }
        return this.http.get<SearchHintBackendModel[]>(searchOptionsUrl(tfOrCl),
            {params});
    }

    public getSearchResult(filter: SearchQueryModel, params: AsbServerSideModel):
        Observable<SearchResultsBackendModel> {
        if (!filter || (!filter.isAdvanced && !filter.searchInput)) {
            return of({results: [], total: null});
        }
        if (!filter.isAdvanced && filter.searchInput) {
            switch (filter.searchBy) {
                case "id": {
                    const rsId: string = filter.searchInput.match(/rs\d+/) ? filter.searchInput.slice(2) : filter.searchInput;
                    return this.http.get<SearchResultsBackendModel>(
                        `${searchSnpsResultsUrl}/rs/${rsId}`, {
                            params: convertServerSideModelToServerSideBackendModel(params)
                        });
                }
                case "pos": {
                    const positions: {start: string, end: string} =
                        getStartEndPositions(filter.searchInput);
                    return this.http.get<SearchResultsBackendModel>(
                        `${searchSnpsResultsUrl}/gp/${filter.chromosome}/${positions.start}/${positions.end}`, {
                            params: convertServerSideModelToServerSideBackendModel(params)
                        });
                }
            }
        } else {
            return this.http.get<SearchResultsBackendModel>(
                `${searchSnpsResultsUrl}/advanced`, {
                    params: {
                        ...makeParamsForAdvancedSearchResults(filter),
                        ...convertServerSideModelToServerSideBackendModel(params)
                    }
                });
        }
    }
    getSearchResultsCsv(filter: SearchQueryModel): Observable<Blob> {
        return this.http.get(
            `${searchSnpsResultsUrl}/advanced/csv`, {
                params: makeParamsForAdvancedSearchResults(filter),
                responseType: "blob"
            });
    }
}

function makeParamsForSearchOptions(tfOrCl: "tf" | "cl",
                                 options: string[] | null,
                                 search: string | null): {[id: string]: string} {
    const params: { [id: string]: string } = {};
    if (options && options.length > 0) {
        params["options"] = options.join(",");
    }
    if (search !== null && search !== "") {
        let search_opt: string = search.endsWith("%") ? search : search + "%"
        search_opt = search_opt.startsWith('*') ? '%' + search_opt.slice(1) : search_opt

        params["search"] = search_opt
    }
    return params;
}

function getStartEndPositions(searchInput: string) {
    return searchInput.match(/^\d*$/) ?
        {start: searchInput, end: searchInput} :
        {start: searchInput.split("-")[0] === "0" ?
                "1" : searchInput.split("-")[0],
            end: searchInput.split("-")[1]};
}

function makeParamsForAdvancedSearchResults(filter: SearchQueryModel): {[id: string]: string} {
    const params: {[id: string]: string} = {};

    if (filter.clList && filter.clList.length > 0) {
        params["cell_types"] = filter.clList.join(",");
    }

    if (filter.chromosome && filter.chromosome !== "any chr") {
        if (filter.searchInput) {
            const positions: { start: string, end: string } =
                getStartEndPositions(filter.searchInput);

            params["chromosome"] = filter.chromosome;
            params["start"] = positions.start;
            params["end"] = positions.end;
        } else {
            params["chromosome"] = filter.chromosome;
        }
    }

    if (filter.tfList && filter.tfList.length > 0) {
        params["transcription_factors"] =
            filter.tfList.join(",");
    }
    const phenList: string = formCheckboxesToList(filter);
    if (phenList) {
        params["phenotype_databases"] = phenList;
    }
    const concList: string = formCheckboxesToList(filter, "concordance");
    if (concList) {
        params['motif_concordance'] = concList
    }

    return params;
}
