export interface SnpInfoModel {
    rsId: string;
    chr: string;
    pos: number;
    refBase: string;
    altBase: string;
    transFactors: TfSnpModel[];
    cellLines: ClSnpModel[];
    phenotypes: phenotypesModel

}
export interface phenotypesModel {
    ebi: string[],
    grasp: string[],
    clinvar: string[],
    phewas: string[],
    finemapping: string[],
    qtl: string[],
}
export interface SnpSearchModel {
    rsId: string;
    chr: string;
    pos: number;
    refBase: string;
    altBase: string;
    transFactors: TfSnpCutModel[];
    cellLines: ClSnpCutModel[];

}
export interface SnpInfoBackendModel {
    chromosome: string,
    position: number,
    ref: string,
    alt: string,
    rs_id: number,
    tf_aggregated_snps: TfSnpBackendModel[],
    cl_aggregated_snps: ClSnpBackendModel[],
    phenotypes: phenotypesBackendModel[]
}
export interface phenotypesBackendModel {
    db_name: string,
    phenotype_string: string,
}
export interface SnpSearchBackendModel {
    chromosome: string,
    position: number,
    ref: string,
    alt: string,
    rs_id: number,
    tf_aggregated_snps: TfSnpBackendCutModel[],
    cl_aggregated_snps: ClSnpBackendCutModel[],
}

export interface ClSnpBackendCutModel {
    cl_snp_id: number,
    cell_line: {
        cl_id: number,
        name: string
    },
    log_p_value_ref: number,
    log_p_value_alt: number,
    mean_bad: number,
    is_asb: boolean,
}

export interface ClSnpBackendModel extends ClSnpBackendCutModel{
    es_ref: number,
    es_alt: number

}
export interface TfSnpBackendCutModel {
    tf_snp_id: number,
    transcription_factor: {
        tf_id: number,
        name: string
    },
    log_p_value_ref: number,
    log_p_value_alt: number,
    is_asb: boolean,
}
export interface TfSnpBackendModel extends TfSnpBackendCutModel{
    mean_bad: number,
    es_ref: number,
    es_alt: number,
    motif_log_p_ref: number,
    motif_log_p_alt: number,
    motif_log_2_fc: number,
    motif_orientation: boolean,
    motif_position: number,
    motif_concordance: boolean,

}
interface AbstractSnpCutModel {
    name: string;
    pValueRef: number;
    pValueAlt: number;
}
interface AbstractSnpModel extends AbstractSnpCutModel{
    meanBad: number;
    effectSizeRef: number;
    effectSizeAlt: number;
}
export interface TfSnpCutModel extends AbstractSnpCutModel{
}

export interface ClSnpCutModel extends AbstractSnpCutModel{

}
export interface TfSnpModel extends AbstractSnpModel{
    motifPRef: number,
    motifPAlt: number,
    motifFc: number,
    motifOrientation: boolean,
    motifPosition: number,
    motifConcordance: boolean,
}

export interface ClSnpModel extends AbstractSnpModel{
}
