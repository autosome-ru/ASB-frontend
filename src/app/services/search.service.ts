import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { searchOptionsUrl, searchSnpsResultsUrl} from "src/app/models/urls";
import {
    SearchHintBackendModel,
    SearchQueryModel,
} from "../models/searchQueryModel";
import {SnpSearchBackendModel} from "src/app/models/data.model";


@Injectable()
export class SearchService {

    constructor(private http: HttpClient) {
    }

    public getSearchOptions(filter: SearchQueryModel, tfOrCl: "tf" | "cl"):
        Observable<SearchHintBackendModel[]> {
        let params: {[id: string]: string};

        if (tfOrCl === "tf") {
            params = searchOptionsParamsMake(tfOrCl, filter.tfList, filter.searchTf);
        } else {
            params = searchOptionsParamsMake(tfOrCl, filter.clList, filter.searchCl);
        }
        return this.http.get<SearchHintBackendModel[]>(searchOptionsUrl(tfOrCl),
            {params});
    }





    public getSearchResult(filter: SearchQueryModel, isAdvanced: boolean):
        Observable<SnpSearchBackendModel[]> {
        if (!isAdvanced) {
            switch (filter.searchBy) {
                case "id": {
                    return this.http.get<SnpSearchBackendModel[]>(
                        `${searchSnpsResultsUrl}/rs/${filter.searchInput}`);
                }
                case "pos": {
                    const [startPos, endPos]: string[] = filter.searchInput.split(":");
                    return this.http.get<SnpSearchBackendModel[]>(
                        `${searchSnpsResultsUrl}/gp/chr${filter.chromosome}/${startPos}/${endPos}`);
                }
            }
        } else {
            return this.http.get<SnpSearchBackendModel[]>(
                `${searchSnpsResultsUrl}/advanced`, {
                    params: searchResultsParamsMakeAdvanced(filter),
                });
        }
    }
    getSearchResultsCsv(filter: SearchQueryModel): Observable<Blob> {
        return this.http.get(
            `${searchSnpsResultsUrl}/advanced/csv`, {
                params: searchResultsParamsMakeAdvanced(filter),
                responseType: "blob"
            });
    }
}

function searchOptionsParamsMake(tfOrCl: "tf" | "cl",
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

function searchResultsParamsMakeAdvanced(filter: SearchQueryModel): {[id: string]: string} {
    const params: {[id: string]: string} = {};
    filter.searchByArray.forEach(s => {
            switch (s) {
                case "cl":
                    if (filter.clList.length > 0) {
                        params["cell_types"] = filter.clList.join(",");
                    }
                    return;
                case "pos":
                    params["chromosome"] = "chr" + filter.chromosome;
                    params["start"] = filter.searchInput.split(":")[0];
                    params["end"] = filter.searchInput.split(":")[1];
                    return;
                case "tf":
                    if (filter.tfList.length > 0) {
                        params["transcription_factors"] =
                            filter.tfList.join(",");
                    }
                    return;

            }
        }
    );
    return params;
}
