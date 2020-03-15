import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {searchOptionsUrl, searchSnpsResultsUrl} from "src/app/models/urls";
import {SearchQueryModel} from "../models/searchQueryModel";
import {SnpSearchBackendModel} from "src/app/models/data.model";


@Injectable()
export class SearchService {

    constructor(private http: HttpClient) {
    }

    public getSearchOptions(filter: SearchQueryModel): Observable<string[]> {
        return this.http.get<string[]>(`${searchOptionsUrl}/${filter.searchInput}`);
    }

    public getSearchResult(filter: SearchQueryModel): Observable<SnpSearchBackendModel[]> {
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
    }
}
