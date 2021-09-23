import {ConcordanceBackendModel, MotifSnpModel, SnpGenPosModel} from './data.model';
export interface PingDataModel {
    ticketId: string;
    status: string;
    dateCreated: Date;
    processingStartedAt: Date;
    expirationDate: Date;
    statusDetails: string;
    positionInQueue: number;
    elapsedTime: number;
}
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
    undefinedCount: number;
    negativesCount: number;
    ratio: number;
    expRatio: number;
    tfRatio: number;
    fdr: number;
    background: BackgroundSelect;
    clRatio: number;
    pValue: number | string;
    notFound: number;
    totalSNPs: number;
    oddsRatio: number | string;
    clAsbs: number;
    clNegativesCount: number;
    clPvalue: number | string
    clOdds: number | string;
    processingTime: string;
    tfAsbs: number;
    tfNegativesCount: number;
    tfPvalue: number | string;
    tfOdds: number | string;
    tfAsbList: CountModel[];
    clAsbList: CountModel[];
    tfAsbData: AsbStatsDataModel[];
    clAsbData: AsbStatsDataModel[];
    chrAsbData: AsbStatsDataModel[];
    chrPvalue: number | string;
    chrTfPvalue: number | string;
    chrClPvalue: number | string;
    tfAsbListSum: CountModel[];
    clAsbListSum: CountModel[];
    lastStatusUpdateAt: string;
    processingStartedAt: Date;

}

export interface StatsDataBackendModel {
    all_rs: number;
    all_asbs_rs: number;
    undefined_rs: number;
    all_negatives_rs: number;
    all_log10_p_value_rs: string;
    all_odds_rs: string;
    cl_asbs_rs: number;
    expected_asbs_all_rs: number;
    expected_negatives_all_rs: number;
    cl_negatives_rs: number;
    tf_asb_data: AsbStatsBackendDataModel[];
    cl_asb_data: AsbStatsBackendDataModel[];
    chr_asb_data: AsbStatsBackendDataModel[];
    cl_log10_p_value_rs: string;
    cl_odds_rs: string;
    processing_time: string;
    concordant_asbs: ConcordanceBackendModel[];
    tf_asbs_rs: number;
    tf_negatives_rs: number;
    tf_log10_p_value_rs: string;
    tf_odds_rs: string;
    chr_log10_p_value_rs: string;
    chr_tf_log10_p_value_rs: string;
    chr_cl_log10_p_value_rs: string;
    tf_asb_counts: CountModel[];
    cl_asb_counts: CountModel[];
    tf_asb_counts_top: CountModel[];
    cl_asb_counts_top: CountModel[];
    last_status_update_at: string;
    processing_started_at: string;
}
export interface AsbStatsBackendDataModel {
    name: string;
    asbs: number;
    candidates: number;
    asbs_rs: number;
    candidates_rs: number;
    odds: string;
    log10_p_value: string;
    log10_fdr: string;
}
export interface AsbStatsDataModel {
    name: string;
    asbsRs: number;
    negativesRs: number;
    odds: number | string;
    pValue: number | string;
    fdr: number | string;
}
export interface PingDataBackendModel {
    ticket_id: string;
    date_created: string;
    expiration_date: string;
    status: string;
    processing_started_at: string;
    elapsed_time: number;
    position_in_queue: number;
    status_details: string;
}
export interface AnnotationDataBackendModel {
    ticket_id: string;
    fdr: number;
    background: BackgroundSelect;
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
    clinvar: string;
    ebi: string;
    finemapping: string;
    grasp: string;
    phewas: string;
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
    clinvar: string;
    ebi: string;
    finemapping: string;
    grasp: string;
    phewas: string;
}


export type BackgroundSelect = 'WG' | 'LD-EUR' | 'LD-AFR' | 'LD-ASN' | 'LOCAL'
