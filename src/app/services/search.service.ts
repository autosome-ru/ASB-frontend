import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {searchOptionsUrl, searchResultsUrl} from "src/app/models/urls";
import {SearchModel} from "../models/search.model";
import {SnpInfoModel} from "../models/data.model";


@Injectable()
export class SearchService {

    constructor(private http: HttpClient) {
    }

    public getSearchOptions(filter: SearchModel): Observable<string[]> {
        return this.http.get<string[]>(`${searchOptionsUrl}/${filter.searchInput}`);
    }

    public getSearchResult(filter: SearchModel): Observable<SnpInfoModel[]> {
        return this.http.get<SnpInfoModel[]>(`${searchResultsUrl}/${filter.searchInput}`);
    }
}
