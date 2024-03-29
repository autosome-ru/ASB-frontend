import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
    AnnotationDataBackendModel, AnnotationSnpBackendModel, BackgroundSelect, PingDataBackendModel
} from '../models/annotation.model';
import {TfOrCl} from '../models/data.model';
import {UrlService} from "./url.service";
import {AsbServerSideFilterModel, AsbServerSideModel} from "../models/table.model";
import {convertServerSideModelToServerSideBackendModel} from "../helpers/converters/snp-model.converter";


@Injectable()
export class ProcessingService {
    constructor(private http: HttpClient, private urlService: UrlService) {
    }

    startProcessTicket(ticket: string, fdr: string, es: string, background: BackgroundSelect): Observable<object> {
        return this.http.post<object>(`${this.urlService.getUrlForQuery("ananastra")}/process/${ticket}`,
            {}, {params: {fdr, es, background}});
    }

    getFileStatsByTicket(ticket: string): Observable<AnnotationDataBackendModel> {
        return this.http.get<AnnotationDataBackendModel>(`${this.urlService.getUrlForQuery("ananastra")}/ticket/${ticket}`);
    }

    pingStatsByTicket(ticket: string): Observable<PingDataBackendModel> {
        return this.http.get<PingDataBackendModel>(`${this.urlService.getUrlForQuery("ananastra")}/ticket/ping/${ticket}`);
    }

    getTableData(ticket: string, tfOrCl: TfOrCl, isExpanded: boolean, pagination: AsbServerSideFilterModel):
        Observable<{results: AnnotationSnpBackendModel[], total: number}> {
        return this.http.get<{results: AnnotationSnpBackendModel[], total: number}>(`${this.urlService.getUrlForQuery("ananastra")}/result/${ticket}`,
            {params: {
                ...convertServerSideModelToServerSideBackendModel(pagination, 'filter'),
                result_param: tfOrCl + (isExpanded ? '' : '_sum')}});
    }
}
