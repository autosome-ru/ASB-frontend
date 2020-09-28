import {MotifConcordanceModel, PhenotypesModel, SnpSearchBackendModel, SnpSearchModel} from "./data.model";
import {AsbServerSideModel} from "./table.model";
import {ChromPos} from "../modules/shared/form-fields/form-fields.component";

export interface SearchQueryModel extends PhenotypesModel, AsbServerSideModel, MotifConcordanceModel {
    isAdvanced: boolean;
    rsId: string;
    geneId: string;
    geneName: string;
    chromPos: ChromPos;
    searchBy: "id" | "pos" | "geneId" | "geneName";
    searchCl: string;
    searchTf: string;
    tfList: string[];
    clList: string[];
}

export interface SearchHintBackendModel {
    name: string;
    aggregated_snps_count: number;
}

export interface SearchByGeneNameHintBackendModel {
    gene_name: string;
    gene_id: string;
    chromosome: string;
    start_pos: number;
    end_pos: number;
}

export interface SearchHintModel {
    name: string;
    aggregatedSnpCount: number;
}

export interface GeneModel {
    name: string;
    id: string;
    chr: string;
    startPos: number;
    endPos: number;
}

export interface SearchParamsModel {
    pos: string;
    rs: string;
    chr: string;
    by: string;
    g_id: string;
    g_name: string;
    cl: string;
    tf: string;
    motif_conc: string;
    phe_db: string;
}

export interface SearchResultsModel {
    results: SnpSearchModel[];
    gene?: GeneModel;
    total: number;
}

export interface SearchResultsBackendModel {
    results: SnpSearchBackendModel[];
    gene?: SearchByGeneNameHintBackendModel;
    total: number;
}
