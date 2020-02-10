import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SnpInfoModel} from "src/app/models/data.model";
import {snpInfoUrl} from "../models/urls";


@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    public getSnpInfoById(id: string): Observable<SnpInfoModel> {
        return this.http.get<SnpInfoModel>(`${snpInfoUrl}/${id}`);
    }
}
