import {SnpInfoBackendModel, SnpInfoModel} from "../models/data.model";


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
    result.chr = model.chromosome;
    result.pos = model.position;
    result.rsId = "" + model.rs_id;
    result.refBase = model.ref;
    result.altBase = model.alt;
    result.cellLines = model.cl_aggregated_snps.map(s =>
        (   {
            effectSizeRef: s.es_ref,
            effectSizeAlt: s.es_alt,
            pValueRef: s.p_value_ref,
            pValueAlt: s.p_value_alt,
            name: s.cell_line.name,
            meanBad: 1,
        })
    );
    result.transFactors = model.tf_aggregated_snps.map(s =>
        (   {
            effectSizeRef: s.es_ref,
            effectSizeAlt: s.es_alt,
            pValueRef: s.p_value_ref,
            pValueAlt: s.p_value_alt,
            name: s.transcription_factor.name,
            meanBad: 1,
        })
    );

    return result;
}
