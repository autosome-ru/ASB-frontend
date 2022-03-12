import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {DownloadTableType, TfOrCl} from '../models/data.model';
import {UrlService} from "./url.service";



@Injectable()
export class DownloadService {
  constructor(private http: HttpClient, private urlService: UrlService) {
  }

  downloadTable(ticket: string, downloadType: DownloadTableType,
                isExpanded: boolean): Observable<Blob> {
    if (downloadType === 'target_genes') {
      return this.http.get(`${this.urlService.getUrlForQuery("ananastra")}/target_genes/${ticket}`,
          {
              responseType: 'blob'
          })
    }
    return this.http.get(`${this.urlService.getUrlForQuery("ananastra")}/result/${ticket}`,
      {
        responseType: 'blob',
        params: {
          result_param: downloadType + (isExpanded ? '' : '_sum'),
          format: 'tsv'
        }});
  }
}
