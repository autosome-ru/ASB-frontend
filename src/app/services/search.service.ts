import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {
    SearchByGeneNameHintBackendModel,
    SearchHintBackendModel,
    SearchQueryModel, SearchResultsBackendModel,
} from "../models/search-query.model";
import {formCheckboxesToList} from "../helpers/converter/search-model.converter";
import {AsbServerSideModel} from "../models/table.model";
import {convertServerSideModelToServerSideBackendModel} from "../helpers/converter/snp-model.converter";
import {UrlService} from "./url.service";


@Injectable()
export class SearchService {
    constructor(private http: HttpClient, private urlService: UrlService) {
    }

    public getSearchOptions(filter: SearchQueryModel, tfOrCl: "tf" | "cl"):
        Observable<SearchHintBackendModel[]> {
        let params: {[id: string]: string};

        if (tfOrCl === "tf") {
            params = makeParamsForSearchOptions(tfOrCl, filter.tfList, filter.searchTf);
        } else {
            params = makeParamsForSearchOptions(tfOrCl, filter.clList, filter.searchCl);
        }
        return this.http.get<SearchHintBackendModel[]>(this.urlService.getUrlForQuery('searchOptAdv', tfOrCl),
            {params});
    }

    public getSearchOptionsByGeneName(filter: string): Observable<SearchByGeneNameHintBackendModel[]> {
        return this.http.get<SearchByGeneNameHintBackendModel[]>(this.urlService.getUrlForQuery('searchOptGene'),
            {params: {search: addPercents(filter)}});
    }

    public getSearchResult(filter: SearchQueryModel, params: AsbServerSideModel):
        Observable<SearchResultsBackendModel> {
        if (!filter) {
            if (!filter.isAdvanced &&
                (
                    (filter.searchBy == "id" && !filter.rsId) ||
                    (filter.searchBy == "pos" && !filter.chromPos.chr) ||
                    (filter.searchBy == "geneId" && !filter.geneId) ||
                    (filter.searchBy == "geneName" && !filter.geneName)
                )
            ) {
                return of({results: [], total: null});
            }
        }
        if (!filter.isAdvanced && filter.searchBy !== "pos") {
            switch (filter.searchBy) {
                case "geneId":
                    return this.http.get<SearchResultsBackendModel>(
                        `${this.urlService.getUrlForQuery("search")}/gene_id/${filter.geneId}`, {
                            params: convertServerSideModelToServerSideBackendModel(params)
                        });
                case "id":
                    const rsId: string = filter.rsId.match(/^rs\d+$/) ? filter.rsId.slice(2) : filter.rsId;
                    return this.http.get<SearchResultsBackendModel>(
                        `${this.urlService.getUrlForQuery("search")}/rs/${rsId}`, {
                            params: convertServerSideModelToServerSideBackendModel(params)
                        });
                case "geneName":
                    return this.http.get<SearchResultsBackendModel>(
                        `${this.urlService.getUrlForQuery("search")}/gene_name/${filter.geneName}`, {
                            params: convertServerSideModelToServerSideBackendModel(params)
                        });
            }
        } else {
            return this.http.get<SearchResultsBackendModel>(
                `${this.urlService.getUrlForQuery("search")}/advanced`, {
                    params: {
                        ...makeParamsForAdvancedSearchResults(filter),
                        ...convertServerSideModelToServerSideBackendModel(params)
                    }
                });
        }
    }
    getSearchResultsCsv(filter: SearchQueryModel): Observable<Blob> {
        return this.http.get(
            `${this.urlService.getUrlForQuery("search")}/advanced/tsv`, {
                params: makeParamsForAdvancedSearchResults(filter),
                responseType: "blob"
            });
    }
}

function makeParamsForSearchOptions(tfOrCl: "tf" | "cl",
                                    options: string[] | null,
                                    search: string | null): {[id: string]: string} {
    const params: { [id: string]: string } = {};
    if (options && options.length > 0) {
        params.options = options.join(",");
    }
    params.search = addPercents(search)

    return params;
}

function addPercents(search: string): string {
    let search_opt: string = ''
    if (search !== null && search !== "") {
        search_opt= search.endsWith("%") ? search : search + "%";
        search_opt = search_opt.startsWith("*") ? "%" + search_opt.slice(1) : search_opt;
    }
    return search_opt;
}

function getStartEndPositions(searchInput: string) {
    return searchInput.match(/^\d*$/) ?
        {start: searchInput, end: searchInput} :
        {start: searchInput.split("-")[0] === "0" ?
                "1" : searchInput.split("-")[0],
            end: searchInput.split("-")[1]};
}

function makeParamsForAdvancedSearchResults(filter: SearchQueryModel): {[id: string]: string} {
    const params: {[id: string]: string} = {};

    if (filter.clList && filter.clList.length > 0) {
        params.cell_types = filter.clList.join(",");
    }

    if (filter.chromPos.chr) {
        params.chromosome = "chr" + filter.chromPos.chr;
        if (filter.chromPos.pos) {
            const positions: { start: string, end: string } =
                getStartEndPositions(filter.chromPos.pos);
            params.start = positions.start;
            params.end = positions.end;
        }
    }

    if (filter.tfList && filter.tfList.length > 0) {
        params.transcription_factors =
            filter.tfList.join(",");
    }
    const phenList: string = formCheckboxesToList(filter);
    if (phenList) {
        params.phenotype_databases = phenList;
    }
    const concList: string = formCheckboxesToList(filter, "concordance", true);
    if (concList) {
        params.motif_concordance = concList;
    }

    return params;
}
