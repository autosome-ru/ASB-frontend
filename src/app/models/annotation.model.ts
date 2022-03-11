import {MotifSnpModel, SnpGenPosModel} from './data.model';
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

export interface CountBackendModel {
    name: string;
    count: number;
    background_count?: number;
}

export interface CountModel {
    name: string;
    count: number;
    expCount?: number;
}
export type pValueString = number | 'infinity'
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
    pValue: pValueString;
    notFound: number;
    totalSNPs: number;
    totalUnqiueSNPs: number;
    oddsRatio: pValueString;
    clAsbs: number;
    clNegativesCount: number;
    clPvalue: pValueString;
    clOdds: pValueString;
    processingTime: string;
    tfAsbs: number;
    tfNegativesCount: number;
    tfPvalue: pValueString;
    tfOdds: pValueString;
    tfAsbList: CountModel[];
    clAsbList: CountModel[];
    tfAsbData: AsbStatsDataModel[];
    clAsbData: AsbStatsDataModel[];
    chrAsbData: AsbStatsDataModel[];
    chrPvalue: pValueString;
    chrTfPvalue: pValueString;
    chrClPvalue: pValueString;
    tfAsbListSum: CountModel[];
    clAsbListSum: CountModel[];
}

export interface StatsDataBackendModel {
    unique_submitted_snps_count: number;
    submitted_snps_count: number;
    processing_time: string;
    undefined_rs: number;
    all: {
        asbs_rs: number;
        negatives_rs: number;
        log10_p_value_rs: string;
        odds_rs: string;
        expected_asbs_rs: number;
        expected_negatives_rs: number;
    },
    cl: {
        asbs_rs: number;
        negatives_rs: number;
        log10_p_value_rs: string;
        odds_rs: string;
        expected_asbs_rs: number;
        expected_negatives_rs: number;
        asb_counts: CountBackendModel[];
        asb_counts_top: CountBackendModel[];
        asb_data: AsbStatsBackendDataModel[];
    },
    tf: {
        asbs_rs: number;
        negatives_rs: number;
        log10_p_value_rs: string;
        odds_rs: string;
        expected_asbs_rs: number;
        expected_negatives_rs: number;
        asb_counts: CountBackendModel[];
        asb_counts_top: CountBackendModel[];
        asb_data: AsbStatsBackendDataModel[];
    },
    chr: {
        asb_data: AsbStatsBackendDataModel[];
        log10_p_value_rs: string;
        tf_log10_p_value_rs: string;
        cl_log10_p_value_rs: string;
    }
}
export interface AsbStatsBackendDataModel {
    name: string;
    asbs_rs: number;
    negatives_rs: number;
    expected_asbs_rs: number;
    expected_negatives_rs: number;
    odds: string;
    log10_p_value: string;
    log10_fdr: string;
}
export interface AsbStatsDataModel {
    name: string;
    asbsRs: number;
    negativesRs: number;
    expectedAsbsRs: number;
    expectedNegativesRs: number;
    odds: pValueString;
    pValue: pValueString;
    fdr: pValueString;
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
    rs_id: pValueString;
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
    tf_uniprot_ac?: string;
    cell_type?: string;
    cell_type_gtrd_id?: number;
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
    cellTypeId?: number;
    transcriptionFactor?: string;
    tfUniprotAc?: string;
    tfBindingPreferences?: string;
    prefAllele?: string;
    isEqtl?: boolean;
    gtexEqtlTargetGenes?: string;
    log10FdrRef: number;
    log10FdrAlt: number;
    log10TopFdr: number;
    effectSizeRef: number;
    effectSizeAlt: number;
    topEffectSize: number;
    alleles?: string[];
    clinvar: string;
    ebi: string;
    finemapping: string;
    grasp: string;
    phewas: string;
}


export type BackgroundSelect = 'WG' | 'LD-EUR' | 'LD-AFR' | 'LD-ASN' | 'LOCAL'
