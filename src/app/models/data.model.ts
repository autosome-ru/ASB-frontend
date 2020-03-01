interface SnpGenPosModel {
    rsId: string;
    chr: string;
    pos: number;
    refBase: string;
    altBase: string;
}

interface SnpGenPosBackendModel {
    chromosome: string;
    position: number;
    ref: string;
    alt: string;
    rs_id: number;
}

export interface SnpInfoModel extends SnpGenPosModel {
    transFactors: TfSnpModel[];
    cellLines: ClSnpModel[];
    phenotypes: PhenotypesModel;

}
export interface PhenotypesModel {
    ebi: string[];
    grasp: string[];
    clinvar: string[];
    phewas: string[];
    finemapping: string[];
    QTL: string[];
}
export interface SnpSearchModel extends SnpGenPosModel {
    transFactors: TfSnpCutModel[];
    cellLines: ClSnpCutModel[];
}
export interface SnpInfoBackendModel extends SnpGenPosBackendModel {
    tf_aggregated_snps: TfSnpBackendModel[];
    cl_aggregated_snps: ClSnpBackendModel[];
    phenotypes: phenotypesBackendModel[];
}
export interface phenotypesBackendModel {
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
    motif_concordance: boolean;
    exp_snps: ExpSnpBackendModel[];

}
interface AbstractSnpCutModel {
    name: string;
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
    motifConcordance: boolean;
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
    pValueRef: number;
    pValueAlt: number;
    bad: string;
    expId: number;
    align: number;
    tfName: string;
    clName: string;
}
