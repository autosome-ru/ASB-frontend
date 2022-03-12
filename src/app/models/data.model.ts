export interface SnpGenPosModel {
    hasConcordance?: boolean;
    rsId: string;
    chr: string;
    pos: number;
    refBase: string;
    altBase: string;
    context: string;
}
export interface ConcordanceBackendModel {
    rs_id: number;
    tf_name: string;
    alt: string;
    concordance: string;
}
export interface SnpGenPosBackendModel {
    chromosome: string;
    position: number;
    ref: string;
    alt: string;
    has_concordance?: boolean;
    rs_id: number;
    context: string;
}

export interface SnpInfoModel extends SnpGenPosModel {
    transFactors: TfSnpModel[];
    cellLines: ClSnpModel[];
    phenotypes: PhenotypesModel;

}

export interface PhenotypesModel {
    total?: number;
    ebi: string[] | boolean;
    grasp: string[] | boolean;
    clinvar: string[] | boolean;
    phewas: string[] | boolean;
    finemapping: string[] | boolean;
    QTL: string[] | boolean;
}

export interface MotifConcordanceModel {

}
export interface SnpSearchModel extends SnpGenPosModel {
    transFactors: TfSnpCutModel[];
    cellLines: ClSnpCutModel[];
}
export interface SnpInfoBackendModel extends SnpGenPosBackendModel {
    tf_aggregated_snps: TfSnpBackendModel[];
    cl_aggregated_snps: ClSnpBackendModel[];
    phenotypes: PhenotypesBackendModel[];
}
export interface PhenotypesBackendModel {
    db_name: string;
    phenotype_name: string;
}
export interface SnpSearchBackendModel extends SnpGenPosBackendModel {
    tf_aggregated_snps: TfSnpBackendCutModel[];
    cl_aggregated_snps: ClSnpBackendCutModel[];
}

export interface ClSnpBackendCutModel {
    cl_snp_id: number;
    cell_line: {
        cl_id: number,
        name: string
    };
    log_p_value_ref: number;
    log_p_value_alt: number;
    es_ref: number;
    es_alt: number;
    mean_bad: number;
    is_asb: boolean;
}

export interface ClSnpBackendModel extends ClSnpBackendCutModel {
    exp_snps: ExpSnpBackendModel[];
}


export interface TfSnpBackendCutModel {
    tf_snp_id: number;
    transcription_factor: {
        tf_id: number,
        uniprot_ac: string,
        name: string
    };
    log_p_value_ref: number;
    log_p_value_alt: number;
    es_ref: number;
    es_alt: number;
    is_asb: boolean;
}
export interface TfSnpBackendModel extends TfSnpBackendCutModel {
    mean_bad: number;
    motif_log_p_ref: number;
    motif_log_p_alt: number;
    motif_log_2_fc: number;
    motif_orientation: boolean;
    motif_position: number;
    motif_concordance: string;
    exp_snps: ExpSnpBackendModel[];

}
interface AbstractSnpCutModel extends SnpGenPosModel {
    name: string;
    id: string;
    pValueRef: number;
    pValueAlt: number;
    effectSizeRef: number;
    effectSizeAlt: number;
}
interface AbstractSnpModel extends AbstractSnpCutModel {
    meanBad: number;
    expSnps: ExpSnpModel[];
}
export interface TfSnpCutModel extends AbstractSnpCutModel {
}

export interface ClSnpCutModel extends AbstractSnpCutModel {
}
export interface TfSnpModel extends AbstractSnpModel, MotifSnpModel {

}
export interface MotifSnpModel {
    motifLogPRef: number;
    motifLogPAlt: number;
    motifLog2Fc: number;
    motifOrientation: boolean;
    motifPosition: number;
    motifConcordance: string;
}
export interface ClSnpModel extends AbstractSnpModel {
}

export interface ExpSnpBackendModel {
    exp_snp_id: number;
    ref_readcount: number;
    alt_readcount: number;
    p_value_ref: number;
    p_value_alt: number;
    bad: string;
    experiment: {
        exp_id: number | string,
        align: number,
        tf_name: string,
        cl_name: string
    };
}

export interface ExpSnpModel {
    refReadCount: number;
    altReadCount: number;
    rawPValueRef: number;
    rawPValueAlt: number;
    bad: string;
    expId: string;
    align: number;
    tfName: string;
    clName: string;
}

export type TfOrCl = "tf" | "cl";

export type DownloadTableType = TfOrCl | 'all' | 'not_found' | 'target_genes'
export interface TotalInfoBackendModel {
    cell_types_count: number;
    transcription_factors_count: number;
    snps_count: number;
    asbs_count: number;
    snps_count005: number;
    asbs_count005: number;
    snps_count010: number;
    asbs_count010: number;
}

export interface TotalInfoModel {
    cellTypesCount: number;
    transcriptionFactorsCount: number;
    snpsCount: number;
    snpsCount005: number;
    snpsCount010: number;

    asbsCount: number;
    asbsCount005: number;
    asbsCount010: number;
}

export interface TfInfoBackendModel {
    name: string;
    uniprot_ac: string;
    aggregated_snps_count: number;
    experiments_count: number;
    aggregated_snps_count010: number;
    aggregated_snps_count005: number;
    gene_name: string;
}

export interface ClInfoBackendModel {
    cl_id: number;
    name: string;
    aggregated_snps_count: number;
    experiments_count: number;
    aggregated_snps_count010: number;
    aggregated_snps_count005: number;
}


export interface TfInfoModel {
    uniprotAc: string;
    name: string;
    geneName: string;
    aggregatedSnpsCount: number;
    experimentsCount: number;
    aggregatedSnpsCount010: number;
    aggregatedSnpsCount005: number;
}

export interface ClInfoModel {
    clId: string;
    name: string;
    aggregatedSnpsCount010: number;
    aggregatedSnpsCount: number;
    experimentsCount: number;
    aggregatedSnpsCount005: number;
}
