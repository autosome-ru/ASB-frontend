import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SnpInfoBackendModel} from "src/app/models/data.model";
import {snpsInfoUrl} from "../models/urls";


@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    public getSnpInfoById({rsId: id, alt: altBase}:
                              {rsId: string, alt: string}): Observable<SnpInfoBackendModel> {
        return this.http.get<SnpInfoBackendModel>(`${snpsInfoUrl}/${id}/${altBase}`);
    }
}
