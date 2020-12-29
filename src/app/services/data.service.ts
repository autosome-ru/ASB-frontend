import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClInfoBackendModel, SnpInfoBackendModel, TfInfoBackendModel, TfOrCl, TotalInfoBackendModel} from "src/app/models/data.model";
import {AsbServerSideModel} from "../models/table.model";
import {convertServerSideModelToServerSideBackendModel} from "../helpers/converters/snp-model.converter";
import {UrlService} from "./url.service";


@Injectable()
export class DataService {

    constructor(private http: HttpClient, private urlService: UrlService) {
    }

    public getSnpInfoById({rsId: id, alt: altBase}:
                              {rsId: string, alt: string}): Observable<SnpInfoBackendModel> {
        return this.http.get<SnpInfoBackendModel>(`${this.urlService.getUrlForQuery("snp")}/${id.slice(2)}/${altBase}`);
    }

    public getSnpInfoByIdCsv(id: string, alt: string, tfOrCl: TfOrCl,
                             columns: string[], filter?: string): Observable<Blob> {
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


    public getTfInfo(params: AsbServerSideModel): Observable<TfInfoBackendModel[]> {
        return this.http.get<TfInfoBackendModel[]>(this.urlService.getUrlForQuery("browse") + "/tf",
        {
            params: convertServerSideModelToServerSideBackendModel(params)
        });
    }

    public getClInfo(params: AsbServerSideModel): Observable<ClInfoBackendModel[]> {
        return this.http.get<ClInfoBackendModel[]>(this.urlService.getUrlForQuery("browse") + "/cl",
            {
                params: convertServerSideModelToServerSideBackendModel(params)
            });
    }

}

function constructParams(columns: string[], filter: string, tfOrCl: TfOrCl):
    {[id: string]: string} {
    const params: {[id: string]: string} = {};
    params.columns = columns.map(column => changeName(column, tfOrCl)).join(tfOrCl == 'tf' ? "," :  "@");
    return params;
}

function changeName(name: string, tfOrCl: TfOrCl): string {
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
            return tfOrCl === "tf" ? "transcription_factor.name" : "cell_line.name";
        }
        case "effectSizeRef": {
            return "es_ref";
        }
        case "effectSizeAlt": {
            return "es_alt";
        }
        case "motifPRef": {
            return "motif_log_p_ref";
        }
        case "motifPAlt": {
            return "motif_log_p_alt";
        }
        case "motifConcordance": {
            return "motif_concordance";
        }
        case "motifOrientation": {
            return "motif_orientation";
        }
        case "motifFc": {
            return "motif_log_2_fc";
        }
        case "motifPosition": {
            return "motif_position";
        }
    }
}
