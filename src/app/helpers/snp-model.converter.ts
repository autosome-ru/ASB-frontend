import {
    ClSnpBackendCutModel,
    ClSnpBackendModel, ClSnpCutModel, ClSnpModel,
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
    const result: Partial<SnpInfoModel> = {};
    console.log(model);
    result.chr = model.chromosome;
    result.pos = model.position;
    result.rsId = "rs" + model.rs_id;
    result.refBase = model.ref;
    result.altBase = model.alt;
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
    const result: Partial<SnpSearchModel> = {};
    result.chr = model.chromosome;
    result.pos = model.position;
    result.rsId = "rs" + model.rs_id;
    result.refBase = model.ref;
    result.altBase = model.alt;
    result.cellLines = model.cl_aggregated_snps.map(convertClAggregatedBackendCutSnp);
    result.transFactors = model.tf_aggregated_snps.map(convertTfAggregatedBackendCutSnp);
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
    }
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
    }
}

function convertClAggregatedBackendCutSnp(s: ClSnpBackendCutModel): ClSnpCutModel {
    return {
        pValueRef: s.log_p_value_ref,
        pValueAlt: s.log_p_value_alt,
        name: s.cell_line.name,
    }
}
function convertTfAggregatedBackendCutSnp(s: TfSnpBackendCutModel): TfSnpCutModel {
    return {
        pValueRef: s.log_p_value_ref,
        pValueAlt: s.log_p_value_alt,
        name: s.transcription_factor.name,
    }
}
