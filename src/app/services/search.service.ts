import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { searchOptionsUrl, searchSnpsResultsUrl} from "src/app/models/urls";
import {SearchQueryModel} from "../models/searchQueryModel";
import {SnpSearchBackendModel} from "src/app/models/data.model";


@Injectable()
export class SearchService {

    constructor(private http: HttpClient) {
    }

    public getSearchOptions(filter: SearchQueryModel, tfOrCl: "tf" | "cl"): Observable<string[]> {
        if ((tfOrCl === "tf" && filter.tfList.length > 0 && filter.searchTf !== null) ||
            (tfOrCl === "cl" && filter.clList.length > 0  && filter.searchCl !== null)) {
            return this.http.get<string[]>(`${searchOptionsUrl(tfOrCl)}/${
                    tfOrCl === "tf" ? filter.searchTf : filter.searchCl}`, {params: {
                        options: tfOrCl === "tf" ? filter.tfList.join(",") : filter.clList.join(",")
                    }});
        } else {
            return this.http.get<string[]>(`${searchOptionsUrl(tfOrCl)}/${
                tfOrCl === "tf" ? filter.searchTf : filter.searchCl}`);
        }
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
            return this.http.get<SnpSearchBackendModel[]>(
                `${searchSnpsResultsUrl}/advanced`, {params});
            }
    }
}

