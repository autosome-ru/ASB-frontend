import {
    ClSnpBackendCutModel,
    ClSnpBackendModel, ClSnpCutModel, ClSnpModel, ExpSnpBackendModel, ExpSnpModel,
    SnpInfoBackendModel,
    SnpInfoModel,
    SnpSearchBackendModel,
    SnpSearchModel, TfSnpBackendCutModel, TfSnpBackendModel, TfSnpCutModel, TfSnpModel
} from "../models/data.model";


export function convertSnpInfoBackendModelToSnpInfoModel(
    model: SnpInfoBackendModel
): SnpInfoModel;
export function convertSnpInfoBackendModelToSnpInfoModel(
    model: Partial<SnpInfoBackendModel>
): Partial<SnpInfoModel>;
export function convertSnpInfoBackendModelToSnpInfoModel(
    model: Partial<SnpInfoBackendModel>
): Partial<SnpInfoModel> {
    const result: Partial<SnpInfoModel> = convertSnpModel(model) as SnpInfoModel;
    result.cellLines = model.cl_aggregated_snps.map(convertClAggregatedBackendSnp);
    result.transFactors = model.tf_aggregated_snps.map(convertTfAggregatedBackendSnp);
    return result;
}

export function convertSnpSearchBackendModelToSnpSearchModel(
    model: SnpSearchBackendModel
): SnpSearchModel;
export function convertSnpSearchBackendModelToSnpSearchModel(
    model: Partial<SnpSearchBackendModel>
): Partial<SnpSearchModel>;
export function convertSnpSearchBackendModelToSnpSearchModel(
    model: Partial<SnpSearchBackendModel>
): Partial<SnpSearchModel> {
    const result: Partial<SnpSearchModel> = convertSnpModel(model) as SnpSearchModel;
    result.cellLines = model.cl_aggregated_snps.map(convertClAggregatedBackendCutSnp);
    result.transFactors = model.tf_aggregated_snps.map(convertTfAggregatedBackendCutSnp);
    return result;
}

function convertSnpModel(model: Partial<SnpInfoBackendModel | SnpSearchBackendModel>):
    Partial<SnpInfoModel | SnpSearchBackendModel> {
    const result: Partial<SnpInfoModel> = {};
    result.chr = "chr" + model.chromosome;
    result.pos = model.position;
    result.rsId = "rs" + model.rs_id;
    result.refBase = model.ref;
    result.altBase = model.alt;
    return result;
}

function convertClAggregatedBackendSnp(s: ClSnpBackendModel): ClSnpModel {
    return {
        effectSizeRef: s.es_ref,
        effectSizeAlt: s.es_alt,
        pValueRef: s.log_p_value_ref,
        pValueAlt: s.log_p_value_alt,
        name: s.cell_line.name,
        meanBad: s.mean_bad,
        expSnps: s.exp_snps.map(convertBackendExpSnp)
    };
}
function convertTfAggregatedBackendSnp(s: TfSnpBackendModel): TfSnpModel {
    return {
        effectSizeRef: s.es_ref,
        effectSizeAlt: s.es_alt,
        pValueRef: s.log_p_value_ref,
        pValueAlt: s.log_p_value_alt,
        name: s.transcription_factor.name,
        meanBad: s.mean_bad,
        motifConcordance: s.motif_concordance,
        motifFc: s.motif_log_2_fc,
        motifOrientation: s.motif_orientation,
        motifPAlt: s.motif_log_p_alt,
        motifPRef: s.motif_log_p_ref,
        motifPosition: s.motif_position,
        expSnps: s.exp_snps.map(convertBackendExpSnp)
    };
}

function convertClAggregatedBackendCutSnp(s: ClSnpBackendCutModel): ClSnpCutModel {
    return {
        pValueRef: s.log_p_value_ref,
        pValueAlt: s.log_p_value_alt,
        name: s.cell_line.name,
    };
}
function convertTfAggregatedBackendCutSnp(s: TfSnpBackendCutModel): TfSnpCutModel {
    return {
        pValueRef: s.log_p_value_ref,
        pValueAlt: s.log_p_value_alt,
        name: s.transcription_factor.name,
    };
}

function convertBackendExpSnp(s: ExpSnpBackendModel): ExpSnpModel {
    return {
        pValueAlt: s.p_value_alt,
        pValueRef: s.p_value_ref,
        bad: s.bad,
        altReadCount: s.alt_readcount,
        refReadCount: s.ref_readcount,
        align: s.experiment.align,
        expId: s.experiment.exp_id,
        clName: s.experiment.cl_name,
        tfName: s.experiment.tf_name,
    };
}
