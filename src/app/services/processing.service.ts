import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
    AnnotationDataBackendModel, AnnotationSnpBackendModel, PingDataBackendModel
} from '../models/annotation.model';
import {TfOrCl} from '../models/data.model';
import {UrlService} from "./url.service";


@Injectable()
export class ProcessingService {
    constructor(private http: HttpClient, private urlService: UrlService) {
    }

    startProcessTicket(ticket: string, fdr: string): Observable<object> {
        return this.http.post<object>(`${this.urlService.getUrlForQuery("ananastra")}/process/${ticket}`, {}, {params: {fdr}});
    }

    getFileStatsByTicket(ticket: string): Observable<AnnotationDataBackendModel> {
        return this.http.get<AnnotationDataBackendModel>(`${this.urlService.getUrlForQuery("ananastra")}/ticket/${ticket}`);
    }

    pingStatsByTicket(ticket: string): Observable<PingDataBackendModel> {
        return this.http.get<PingDataBackendModel>(`${this.urlService.getUrlForQuery("ananastra")}/ticket/ping/${ticket}`);
    }

    getTableData(ticket: string, tfOrCl: TfOrCl, isExpanded: boolean): Observable<AnnotationSnpBackendModel[]> {
        return this.http.get<AnnotationSnpBackendModel[]>(`${this.urlService.getUrlForQuery("ananastra")}/result/${ticket}`,
            {params: {result_param: tfOrCl + (isExpanded ? '' : '_sum')}});
    }
}
