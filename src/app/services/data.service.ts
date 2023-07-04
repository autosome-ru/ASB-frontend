import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
    ClSnpBackendModel, ExpSnpModel,
    SnpInfoBackendModel,
    AggType, TfSnpModel,
    TotalInfoBackendModel, AbstractInfoBackendModel, ClSnpModel
} from "src/app/models/data.model";
import {AsbServerSideFilterModel} from "../models/table.model";
import {
    convertBackendExpSnp,
    convertServerSideModelToServerSideBackendModel
} from "../helpers/converters/snp-model.converter";
import {UrlService} from "./url.service";
import {map} from "rxjs/operators";


@Injectable()
export class DataService {

    constructor(private http: HttpClient, private urlService: UrlService) {
    }

    public getSnpInfoById({rsId, alt, fdr}:
                              {rsId: string, alt: string, fdr: string}): Observable<SnpInfoBackendModel> {
        return this.http.get<SnpInfoBackendModel>(
            `${this.urlService.getUrlForQuery("snp")}/${rsId.slice(2)}/${alt}`,
            {params: {fdr}}
        );
    }

    public getSnpInfoByIdCsv(id: string, alt: string, tfOrCl: AggType,
                             columns: Array<keyof ClSnpModel>, filter?: string): Observable<Blob> {
        return this.http.get(`${this.urlService.getUrlForQuery("snp")}/${id.slice(2)}/${alt}/${tfOrCl}/tsv`,
            {params: constructParams(columns, filter, tfOrCl)
                , responseType: "blob"});
    }
    downloadSvg(path: string): Observable<Blob> {
        return this.http.get(path, {responseType: "blob"});
    }

    public getTotalInfo(): Observable<TotalInfoBackendModel> {
        return this.http.get<TotalInfoBackendModel>(this.urlService.getUrlForQuery("browse") + "/total");
    }


    public getFaireInfo(params: AsbServerSideFilterModel): Observable<{results: AbstractInfoBackendModel[], total: number}> {
        return this.http.get<{results: AbstractInfoBackendModel[], total: number}>(this.urlService.getUrlForQuery("browse") + "/faire",
        {
            params: convertServerSideModelToServerSideBackendModel(params)
        });
    }

    public getAtacInfo(params: AsbServerSideFilterModel): Observable<{results: AbstractInfoBackendModel[], total: number}> {
        return this.http.get<{results: AbstractInfoBackendModel[], total: number}>(this.urlService.getUrlForQuery("browse") + "/atac",
            {
                params: convertServerSideModelToServerSideBackendModel(params)
            });
    }

    public getDnaseInfo(params: AsbServerSideFilterModel): Observable<{results: AbstractInfoBackendModel[], total: number}> {
        return this.http.get<{results: AbstractInfoBackendModel[], total: number}>(this.urlService.getUrlForQuery("browse") + "/dnase",
            {
                params: convertServerSideModelToServerSideBackendModel(params)
            });
    }

    public getInnerTableInfo(chromosome, position, alt, aggregationName, aggType: AggType): Observable<ExpSnpModel[]> {
        return this.http.get<ClSnpBackendModel>(
            `${this.urlService.getUrlForQuery("snp")}/${aggType}_aggregated`,
            {
                params: {
                    chromosome,
                    position,
                    alt,
                    aggregation_name: aggregationName
                }
            }).pipe(map(s => s.exp_snps.map(p => convertBackendExpSnp(p))));
    }

}

function constructParams(columns: Array<keyof ClSnpModel>, filter: string, aggType: AggType):
    {[id: string]: string} {
    const params: {[id: string]: string} = {};
    params.columns = columns.map(column => changeName(column, aggType)).join("@");
    return params;
}

function changeName(name: keyof ClSnpModel, aggType: AggType): string {
    switch (name) {
        case "pValueRef": {
            return "log_p_value_ref";
        }
        case "pValueAlt": {
            return "log_p_value_alt";
        }
        case "meanBad": {
            return "mean_bad";
        }
        case "name": {
            return "cell_line.name";
        }
        case "effectSizeRef": {
            return "es_ref";
        }
        case "effectSizeAlt": {
            return "es_alt";
        }
    }
}
