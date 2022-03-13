import {
    ClInfoBackendModel,
    ClInfoModel,
    ClSnpBackendCutModel,
    ClSnpBackendModel,
    ClSnpCutModel,
    ClSnpModel,
    ExpSnpBackendModel,
    ExpSnpModel,
    SnpGenPosBackendModel,
    SnpGenPosModel,
    SnpInfoBackendModel,
    SnpInfoModel,
    SnpSearchBackendModel,
    SnpSearchModel,
    TfInfoBackendModel,
    TfInfoModel, TfOrCl,
    TfSnpBackendCutModel,
    TfSnpBackendModel,
    TfSnpCutModel,
    TfSnpModel,
    TotalInfoBackendModel,
    TotalInfoModel
} from "../../models/data.model";
import {AsbServerSideBackendModel, AsbServerSideFilterModel, AsbServerSideModel} from "../../models/table.model";
import {SortDirection} from "@angular/material/sort";


export function convertTotalInfoBackendModelToTotalInfoModel(model: TotalInfoBackendModel): TotalInfoModel {
    return {
        cellTypesCount: model.cell_types_count,
        transcriptionFactorsCount: model.transcription_factors_count,
        snpsCount: model.snps_count,
        asbsCount: model.asbs_count,
        snpsCount005: model.snps_count005,
        asbsCount005: model.asbs_count005,
        snpsCount010: model.snps_count010,
        asbsCount010: model.asbs_count010,
    };
}

export function convertTfInfoBackendModelToTfInfoModel(model: TfInfoBackendModel): TfInfoModel {
    return {
        experimentsCount: model.experiments_count,
        aggregatedSnpsCount: model.aggregated_snps_count,
        uniprotAc: model.uniprot_ac,
        name: model.name,
        geneName: model.gene_name,
        aggregatedSnpsCount005: model.aggregated_snps_count005,
        aggregatedSnpsCount010: model.aggregated_snps_count010
    };
}

export function convertClInfoBackendModelToClInfoModel(model: ClInfoBackendModel): ClInfoModel {
    return {
        experimentsCount: model.experiments_count,
        aggregatedSnpsCount: model.aggregated_snps_count,
        clId: "" + model.cl_id,
        name: model.name,
        aggregatedSnpsCount005: model.aggregated_snps_count005,
        aggregatedSnpsCount010: model.aggregated_snps_count010
    };
}

function makeFdrTr(fdr: string): number {
    if (!fdr) {
        fdr = '0.05'
    }
    let tr: number = -Math.log10(Number(fdr))
    if (!tr) {
        tr = -Math.log10(0.05)
    }
    return tr
}

function makeEsTr(es: string): number {
    if (!es) {
        es = '0'
    }
    let tr: number = Number(es)
    if (!tr) {
        tr = 0
    }
    return tr
}


function compareTr(value: number, tr: number): boolean {
    if (value === null) {
        return false
    }
    return value >= tr
}

function compareThresholds(value1: number, tr1: number, value2: number, tr2: number): boolean {
    return compareTr(value1, tr1) && compareTr(value2, tr2)
}


export function convertSnpInfoBackendModelToSnpInfoModel(
    model: SnpInfoBackendModel, fdr?: string, es?: string
): SnpInfoModel;
export function convertSnpInfoBackendModelToSnpInfoModel(
    model: Partial<SnpInfoBackendModel>, fdr?: string, es?: string
): Partial<SnpInfoModel>;
export function convertSnpInfoBackendModelToSnpInfoModel(
    model: Partial<SnpInfoBackendModel>, fdr?: string, es?: string
): Partial<SnpInfoModel> {
    const fdrTr = makeFdrTr(fdr)
    const esTr = makeEsTr(es)
    const result: Partial<SnpInfoModel> = convertSnpModel(model) as SnpInfoModel;
    result.cellLines = (model.cl_aggregated_snps.map(s => {
        return {
            ...convertClAggregatedBackendSnp(s),
            ...convertSnpModel(model)
        };
    }) as ClSnpModel[]).filter(
        s => compareThresholds(Math.abs(s.pValueRef), fdrTr, s.effectSizeRef, esTr) ||
            compareThresholds(Math.abs(s.pValueAlt), fdrTr, s.effectSizeAlt, esTr));

    result.transFactors = (model.tf_aggregated_snps.map(s => {
        return {
            ...convertTfAggregatedBackendSnp(s),
            ...convertSnpModel(model)
        };
    }) as TfSnpModel[]).filter(s =>
        compareThresholds(Math.abs(s.pValueRef), fdrTr, s.effectSizeRef, esTr) ||
        compareThresholds(Math.abs(s.pValueAlt), fdrTr, s.effectSizeAlt, esTr));
    return result;
}

export function convertSnpSearchBackendModelToSnpSearchModel(
    model: SnpSearchBackendModel, fdr?: string, es?: string
): SnpSearchModel;
export function convertSnpSearchBackendModelToSnpSearchModel(
    model: Partial<SnpSearchBackendModel>, fdr?: string, es?: string
): Partial<SnpSearchModel>;
export function convertSnpSearchBackendModelToSnpSearchModel(
    model: Partial<SnpSearchBackendModel>, fdr?: string, es?: string
): Partial<SnpSearchModel> {
    const fdrTr = makeFdrTr(fdr)
    const esTr = makeEsTr(es)
    const result: Partial<SnpSearchModel> = convertSnpModel(model) as SnpSearchModel;
    result.cellLines = (model.cl_aggregated_snps.map(s => {
        return {
            ...convertClAggregatedBackendCutSnp(s),
            ...convertSnpModel(model)
        };
    }) as ClSnpCutModel[]).filter(
        s => compareThresholds(Math.abs(s.pValueRef), fdrTr, s.effectSizeRef, esTr) ||
            compareThresholds(Math.abs(s.pValueAlt), fdrTr, s.effectSizeAlt, esTr));
    result.transFactors = (model.tf_aggregated_snps.map(s => {
        return {
            ...convertTfAggregatedBackendCutSnp(s),
            ...convertSnpModel(model)
        };
    }) as TfSnpCutModel[]).filter(s =>
        compareThresholds(Math.abs(s.pValueRef), fdrTr, s.effectSizeRef, esTr) ||
        compareThresholds(Math.abs(s.pValueAlt), fdrTr, s.effectSizeAlt, esTr));
    return result;
}

function convertSnpModel(model: Partial<SnpGenPosBackendModel>):
    Partial<SnpGenPosModel> {
    const result: Partial<SnpGenPosModel> = {};
    result.chr = model.chromosome;
    result.pos = model.position;
    result.hasConcordance = model.has_concordance;
    result.rsId = "rs" + model.rs_id;
    result.refBase = model.ref;
    result.altBase = model.alt;
    if (!model.context || model.context.length !== 49) {
        console.warn("Wrong context value", model.context);
        result.context = ''
    } else {
        result.context = model.context.slice(0, 24) +
            `[${model.ref}/${model.alt}]` + model.context.slice(25);
    }
    return result;
}

function convertClAggregatedBackendSnp(s: ClSnpBackendModel, ): Partial<ClSnpModel> {
    return {
        id: "" + s.cell_line.cl_id,
        name: s.cell_line.name,
        effectSizeRef: s.es_ref,
        effectSizeAlt: s.es_alt,
        pValueRef: checkAndInvert(s.log_p_value_ref),
        pValueAlt: checkAndInvert(s.log_p_value_alt),
        meanBad: s.mean_bad,
        expSnps: s.exp_snps.map(convertBackendExpSnp)
    };
}
function checkAndInvert(number: number): number {
    return number ? -number : number
}
function convertTfAggregatedBackendSnp(s: TfSnpBackendModel): Partial<TfSnpModel> {
    return {
        id: s.transcription_factor.uniprot_ac,
        name: s.transcription_factor.name,
        effectSizeRef: s.es_ref,
        effectSizeAlt: s.es_alt,
        pValueRef: checkAndInvert(s.log_p_value_ref),
        pValueAlt: checkAndInvert(s.log_p_value_alt),
        meanBad: s.mean_bad,
        motifConcordance: s.motif_concordance,
        motifLog2Fc: s.motif_log_2_fc,
        motifOrientation: s.motif_orientation,
        motifLogPAlt: checkAndInvert(s.motif_log_p_alt),
        motifLogPRef: checkAndInvert(s.motif_log_p_ref),
        motifPosition: s.motif_position,
        expSnps: s.exp_snps.map(convertBackendExpSnp)
    };
}

function convertClAggregatedBackendCutSnp(s: ClSnpBackendCutModel): Partial<ClSnpCutModel> {
    return {
        id: "" + s.cell_line.cl_id,
        name: s.cell_line.name,
        effectSizeRef: s.es_ref,
        effectSizeAlt: s.es_alt,
        pValueRef: checkAndInvert(s.log_p_value_ref),
        pValueAlt: checkAndInvert(s.log_p_value_alt),
    };
}
function convertTfAggregatedBackendCutSnp(s: TfSnpBackendCutModel): Partial<TfSnpCutModel> {
    return {
        id: s.transcription_factor.uniprot_ac,
        name: s.transcription_factor.name,
        effectSizeRef: s.es_ref,
        effectSizeAlt: s.es_alt,
        pValueRef: checkAndInvert(s.log_p_value_ref),
        pValueAlt: checkAndInvert(s.log_p_value_alt),
    };
}
function convertExpId(id: number | string): string {
    if (typeof id === 'string') {
        return id
    } else {
        return 'EXP' + addZeros(id);
    }
}

function addZeros(id: number) {
    let result: string = '' + id;
    let len: number = result.length;
    while (len < 6) {
        result = '0' + result;
        len += 1;
    }
    return result;
}

export function convertBackendExpSnp(s: ExpSnpBackendModel): ExpSnpModel {
    return {
        rawPValueAlt: Math.log10(s.p_value_alt),
        rawPValueRef: Math.log10(s.p_value_ref),
        bad: s.bad,
        altReadCount: s.alt_readcount,
        refReadCount: s.ref_readcount,
        align: s.experiment.align,
        expId: convertExpId(s.experiment.exp_id),
        clName: s.experiment.cl_name,
        tfName: s.experiment.tf_name,
    };
}

const refSuffix = "PValRef";
const altSuffix = "PValAlt";
function parseFieldName(active: string): {name: string, allele: "ref" | "alt", tfOrCl: TfOrCl} {

    let allele: "ref" | "alt";
    let tfOrCl: TfOrCl;
    if (active.endsWith(refSuffix)) {
        allele = "ref";
        active = active.replace(refSuffix, "");
    } else {
        allele = "alt";
        active = active.replace(altSuffix, "");
    }
    if (active.endsWith("TF")) {
        tfOrCl = "tf";
    }
    if (active.endsWith("CL")) {
        tfOrCl = "cl";
    }
    return {
        name: active.slice(0, active.length - 2),
        allele,
        tfOrCl,
    };
}

function convertOrderByToBackend(active: string, direction: SortDirection) {
    if (!active || direction === "") {
        return null;
    } else {
        let fieldName: string;
        const parsedName: {name: string, allele: "ref" | "alt", tfOrCl: TfOrCl} = parseFieldName(active);
        if (active.endsWith(altSuffix) || active.endsWith(refSuffix)) {
            fieldName = `${parsedName.tfOrCl.toUpperCase()}@log_p_value_${parsedName.allele}@${parsedName.name}`;
            return (direction === "desc" ? "" : "-") + fieldName;
        } else {
            fieldName = camelCaseToSnakeCase(active);
        }
        return (direction === "desc" ? "-" : "") + fieldName;

    }
}
function camelCaseToSnakeCase(str: string): string {
    return str[0].toLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function convertServerSideModelToServerSideBackendModel(model: AsbServerSideFilterModel, filterField: string='regexp'): AsbServerSideBackendModel {
    const order_by: string = convertOrderByToBackend(model.active, model.direction);
    const pagination: AsbServerSideBackendModel = {
        page: "" + (model.pageIndex + 1),
        size: "" + model.pageSize
    };
    if (model.regexp) {
        if (filterField === 'regexp') {
            pagination[filterField] = '%' + model.regexp + '%';
        } else {
            pagination[filterField] = model.regexp;
        }
    }
    return order_by ? {order_by, ...pagination} : pagination;
}
