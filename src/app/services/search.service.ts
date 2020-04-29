import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { searchOptionsUrl, searchSnpsResultsUrl} from "src/app/models/urls";
import {
    SearchHintBackendModel,
    SearchQueryModel, SearchResultsBackendModel,
} from "../models/searchQueryModel";
import {phenotypesFormToList} from "../helpers/search-model.converter";
import {AsbTableChangesModel} from "../models/table.model";


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

    public getSearchResult(filter: SearchQueryModel, isAdvanced: boolean, params: AsbTableChangesModel):
        Observable<SearchResultsBackendModel> {
        if (!isAdvanced) {
            switch (filter.searchBy) {
                case "id": {
                    return this.http.get<SearchResultsBackendModel>(
                        `${searchSnpsResultsUrl}/rs/${filter.searchInput.slice(2)}`);
                }
                case "pos": {
                    const positions: {start: string, end: string} =
                        getStartEndPositions(filter.searchInput);
                    return this.http.get<SearchResultsBackendModel>(
                        `${searchSnpsResultsUrl}/gp/${filter.chromosome}/${positions.start}/${positions.end}`);
                }
            }
        } else {
            return this.http.get<SearchResultsBackendModel>(
                `${searchSnpsResultsUrl}/advanced`, {
                    params: makeParamsForAdvancedSearchResults(filter),
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
        params["search"] = search.endsWith("%") ? search : search + "%";
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

    if (filter.clList.length > 0) {
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

    if (filter.tfList.length > 0) {
        params["transcription_factors"] =
            filter.tfList.join(",");
    }
    const phenList: string = phenotypesFormToList(filter);
    if (phenList) {
        params["phenotype_databases"] = phenList;
    }

    return params;
}
