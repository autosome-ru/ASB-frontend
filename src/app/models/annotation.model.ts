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
    processingTime: string;
    tfAsbs: number;
    tfCandidates: number;
    tfPvalue: number;
    tfOdds: number;
    tfAsbList: CountModel[];
    clAsbList: CountModel[];
    tfAsbListSum: CountModel[];
    clAsbListSum: CountModel[];
    lastStatusUpdateAt: string
    processingStartedAt: Date
    statusDetails: string;
}

export interface StatsDataBackendModel {
    all_rs: number;
    all_asbs_rs: number;
    all_candidates_rs: number;
    all_log10_p_value: number;
    all_odds: number;
    cl_asbs_rs: number;
    cl_candidates_rs: number;
    cl_log10_p_value: number;
    cl_odds: number;
    processing_time: string;
    concordant_asbs: ConcordanceBackendModel[];
    tf_asbs_rs: number;
    tf_candidates_rs: number;
    tf_log10_p_value: number;
    tf_odds: number;
    tf_asb_counts: CountModel[];
    cl_asb_counts: CountModel[];
    tf_asb_counts_rs: CountModel[];
    cl_asb_counts_rs: CountModel[];
    last_status_update_at: string;
    processing_started_at: string;
    status_details: string;

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
    effect_size_ref: number;
    effect_size_alt: number;
    top_effect_size: number;
    ref?: string;
    alt?: string;
    alleles?: string
    log10_fdr_ref: number;
    log10_fdr_alt: number;
    log10_top_fdr: number;
    tf_binding_preferences: string;
    preferred_allele: string;
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
    prefAllele?: string;
    isEqtl?: boolean;
    targetGenes?: string;
    fdrRef: number;
    fdrAlt: number;
    topFdr: number;
    esRef: number;
    esAlt: number;
    topEs: number;
    alleles?: string[];
}
