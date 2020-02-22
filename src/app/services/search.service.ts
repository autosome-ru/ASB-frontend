import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {searchOptionsUrl, searchResultsUrl} from "src/app/models/urls";
import {SearchQueryModel} from "../models/searchQueryModel";
import {SnpSearchBackendModel} from "../models/data.model";


@Injectable()
export class SearchService {

    constructor(private http: HttpClient) {
    }

    public getSearchOptions(filter: SearchQueryModel): Observable<string[]> {
        return this.http.get<string[]>(`${searchOptionsUrl}/${filter.searchInput}`);
    }

    public getSearchResult(filter: SearchQueryModel): Observable<SnpSearchBackendModel[]> {
        return this.http.get<SnpSearchBackendModel[]>(`${searchResultsUrl}/snps/rs/${filter.searchInput}`);
    }
}
