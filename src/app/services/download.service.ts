import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {TfOrCl} from '../models/data.model';
import {UrlService} from "./url.service";



@Injectable()
export class DownloadService {
  constructor(private http: HttpClient, private urlService: UrlService) {
  }

  downloadTable(ticket: string, tfOrCl: TfOrCl,
                isExpanded: boolean,
                format: string): Observable<Blob> {
    return this.http.get(`${this.urlService.getUrlForQuery("ananastra")}/result/${ticket}`,
      {
        responseType: 'blob',
        params: {
          result_param: tfOrCl + (isExpanded ? '' : '_sum'),
          format: 'tsv'
        }});
  }
}
