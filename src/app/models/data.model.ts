export interface SnpGenPosModel {
    rsId: string;
    chr: string;
    pos: number;
    refBase: string;
    altBase: string;
    context: string;
}

export interface SnpGenPosBackendModel {
    chromosome: string;
    position: number;
    ref: string;
    alt: string;
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
    mean_bad: number;
    is_asb: boolean;
}

export interface ClSnpBackendModel extends ClSnpBackendCutModel {
    es_ref: number;
    es_alt: number;
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
    is_asb: boolean;
}
export interface TfSnpBackendModel extends TfSnpBackendCutModel {
    mean_bad: number;
    es_ref: number;
    es_alt: number;
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
}
interface AbstractSnpModel extends AbstractSnpCutModel {
    meanBad: number;
    effectSizeRef: number;
    effectSizeAlt: number;
    expSnps: ExpSnpModel[];
}
export interface TfSnpCutModel extends AbstractSnpCutModel {
}

export interface ClSnpCutModel extends AbstractSnpCutModel {
}
export interface TfSnpModel extends AbstractSnpModel {
    motifPRef: number;
    motifPAlt: number;
    motifFc: number;
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
        exp_id: number,
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
    expId: number;
    align: number;
    tfName: string;
    clName: string;
}

export type TfOrCl = "tf" | "cl";

export interface TotalInfoBackendModel {
    cell_types_count: number;
    transcription_factors_count: number;
    snps_count: number;
}

export interface TotalInfoModel {
    cellTypesCount: number;
    transcriptionFactorsCount: number;
    snpsCount: number;
}

export interface TfInfoBackendModel {
    name: string;
    uniprot_ac: string;
    aggregated_snps_count: number;
    experiments_count: number;
}

export interface ClInfoBackendModel {
    cl_id: number;
    name: string;
    aggregated_snps_count: number;
    experiments_count: number;
}


export interface TfInfoModel {
    uniprotAc: string;
    name: string;
    aggregatedSnpsCount: number;
    experimentsCount: number;
}

export interface ClInfoModel {
    clId: string;
    name: string;

    aggregatedSnpsCount: number;
    experimentsCount: number;
}
