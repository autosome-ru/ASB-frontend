import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {searchOptionsUrl} from "src/app/models/urls";
import {SearchModel} from "../models/search.model";


@Injectable()
export class SearchService {

    constructor(private http: HttpClient) {
    }

    public getSearchOptions(filter: SearchModel): Observable<string[]> {
        return this.http.get<string[]>(`${searchOptionsUrl}/${filter.searchInput}`);
    }
}
