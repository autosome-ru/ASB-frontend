import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SnpInfoBackendModel} from "src/app/models/data.model";
import {snpInfoUrl} from "../models/urls";


@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    public getSnpInfoById(id: string): Observable<SnpInfoBackendModel> {
        return this.http.get<SnpInfoBackendModel>(`${snpInfoUrl}/${id}`);
    }
}
