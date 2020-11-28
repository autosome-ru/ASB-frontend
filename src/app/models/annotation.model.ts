import {ConcordanceBackendModel, MotifSnpModel, SnpGenPosModel, TfSnpModel} from './data.model';

export interface AnnotationDataModel {
    ticketId: string;
    status: string;
    dateCreated: Date;
    expirationDate: Date;
    metaInfo: StatsDataModel;
}
export interface CountModel {
    name: string;
    count: number
}
export interface StatsDataModel {
    asbCount: number;
    concordantAsbs: Partial<TfSnpModel>[];
    candidatesCount: number;
    ratio: number;
    tfRatio: number;
    clRatio: number;
    pValue: number;
    notFound: number;
    totalSNPs: number;
    oddsRatio: number;
    clAsbs: number;
    clCandidates: number;
    clPvalue: number;
    clOdds: number;
    processingTime: number;
    tfAsbs: number;
    tfCandidates: number;
    tfPvalue: number;
    tfOdds: number;
    tfAsbList: CountModel[];
    clAsbList: CountModel[];
}

export interface StatsDataBackendModel {
    all_rs: number;
    all_asbs: number;
    all_candidates: number;
    all_log10_p_value: number;
    all_odds: number;
    cl_asbs: number;
    cl_candidates: number;
    cl_log10_p_value: number;
    cl_odds: number;
    processing_time: number;
    concordant_asbs: ConcordanceBackendModel[];
    tf_asbs: number;
    tf_candidates: number;
    tf_log10_p_value: number;
    tf_odds: number;
    tf_asb_counts: CountModel[];
    cl_asb_counts: CountModel[];
}

export interface AnnotationDataBackendModel {
    ticket_id: string;
    date_created: string;
    expiration_date: string;
    status: string;
    meta_info: StatsDataBackendModel;
}

export interface AnnotationSnpBackendModel {
    chromosome: string;
    position: number;
    sequence: string;
    rs_id: number | string;
    ref?: string;
    alt?: string;
    alleles?: string
    log10_fdr_ref: number;
    log10_fdr_alt: number;
    tf_binding_preferences: string;
    transcription_factor?: string;
    cell_type?: string;
    is_eqtl?: boolean;
    gtex_eqtl_target_genes?: string;
    motif_log_p_ref?: number;
    motif_log_p_alt?: number;
    motif_log2_fc?: number;
    motif_position?: number;
    motif_orientation?: boolean;
    motif_concordance?: string;
}

export interface AnnotationSnpModel extends SnpGenPosModel, MotifSnpModel {
    cellType?: string;
    transcriptionFactor?: string;
    tfBindPref?: string;
    isEqtl?: boolean;
    targetGenes?: string;
    fdrRef: number;
    fdrAlt: number;
    alleles?: string[];
}
