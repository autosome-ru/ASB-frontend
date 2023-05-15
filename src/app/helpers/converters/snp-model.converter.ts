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
    TfInfoModel, AggType,
    TotalInfoBackendModel,
    TotalInfoModel
} from "../../models/data.model";
import {AsbServerSideBackendModel, AsbServerSideFilterModel} from "../../models/table.model";
import {SortDirection} from "@angular/material/sort";


export function convertTotalInfoBackendModelToTotalInfoModel(model: TotalInfoBackendModel): TotalInfoModel {
    return {
        faireCount: model.faire_count,
        atacCount: model.atac_count,
        dnaseCount: model.dnase_count,
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
        fdr = '0.05';
    }
    let tr: number = -Math.log10(Number(fdr));
    if (!tr) {
        tr = -Math.log10(0.05);
    }
    return tr;
}

function makeEsTr(es: string): number {
    if (!es) {
        es = '0';
    }
    let tr: number = Number(es);
    if (!tr) {
        tr = 0;
    }
    return tr;
}


function compareTr(value: number, tr: number): boolean {
    if (value === null) {
        return false;
    }
    return value >= tr;
}

function compareThresholds(value1: number, tr1: number, value2: number, tr2: number): boolean {
    return compareTr(value1, tr1) && compareTr(value2, tr2);
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
    const fdrTr = makeFdrTr(fdr);
    const esTr = makeEsTr(es);
    const result: Partial<SnpInfoModel> = convertSnpModel(model) as SnpInfoModel;
    result.faireData = (model.faire_aggregated_snps.map(s => {
        return {
            ...convertClAggregatedBackendSnp(s, 'faire'),
            ...convertSnpModel(model)
        };
    }) as ClSnpModel[]).filter(
        s => compareThresholds(Math.abs(s.pValueRef), fdrTr, s.effectSizeRef, esTr) ||
            compareThresholds(Math.abs(s.pValueAlt), fdrTr, s.effectSizeAlt, esTr));

    result.dnaseData = (model.dnase_aggregated_snps.map(s => {
        return {
            ...convertClAggregatedBackendSnp(s, 'dnase'),
            ...convertSnpModel(model)
        };
    }) as ClSnpModel[]).filter(s =>
        compareThresholds(Math.abs(s.pValueRef), fdrTr, s.effectSizeRef, esTr) ||
        compareThresholds(Math.abs(s.pValueAlt), fdrTr, s.effectSizeAlt, esTr));

    result.atacData = (model.atac_aggregated_snps.map(s => {
        return {
            ...convertClAggregatedBackendSnp(s, 'atac'),
            ...convertSnpModel(model)
        };
    }) as ClSnpModel[]).filter(s =>
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
    const fdrTr = makeFdrTr(fdr);
    const esTr = makeEsTr(es);
    const result: Partial<SnpSearchModel> = convertSnpModel(model) as SnpSearchModel;
    result.atacData = (model.atac_aggregated_snps.map(s => {
        return {
            ...convertClAggregatedBackendCutSnp(s),
            ...convertSnpModel(model)
        };
    }) as ClSnpCutModel[]).filter(
        s => compareThresholds(Math.abs(s.pValueRef), fdrTr, s.effectSizeRef, esTr) ||
            compareThresholds(Math.abs(s.pValueAlt), fdrTr, s.effectSizeAlt, esTr));
    result.dnaseData = (model.dnase_aggregated_snps.map(s => {
        return {
            ...convertClAggregatedBackendCutSnp(s),
            ...convertSnpModel(model)
        };
    }) as ClSnpCutModel[]).filter(s =>
        compareThresholds(Math.abs(s.pValueRef), fdrTr, s.effectSizeRef, esTr) ||
        compareThresholds(Math.abs(s.pValueAlt), fdrTr, s.effectSizeAlt, esTr));

    result.faireData = (model.faire_aggregated_snps.map(s => {
        return {
            ...convertClAggregatedBackendCutSnp(s),
            ...convertSnpModel(model)
        };
    }) as ClSnpCutModel[]).filter(s =>
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
    if (!!model.context) {
        switch (model.context.length) {
            case 51:
            case 49: {
                const middleIndex = Math.floor(model.context.length / 2);
                result.context = model.context.slice(0, middleIndex).toLowerCase() +
                    `[${model.ref}/${model.alt}]` + model.context.slice(middleIndex + 1).toLowerCase();
                break;
            }
            default: {
                console.warn(`Unexpected context value ${model.context}, length ${model.context.length} not in [49, 51]`);
                result.context = '';
                break;
            }
        }
    } else {
        console.warn('No context provided');
    }
    return result;
}

function convertClAggregatedBackendSnp(s: ClSnpBackendModel, aggType: AggType): Partial<ClSnpModel> {
    const key: string = 'exp_snps_' + aggType;
    return {
        id: "" + s.cell_line.cl_id,
        name: s.cell_line.name,
        effectSizeRef: s.es_ref,
        effectSizeAlt: s.es_alt,
        pValueRef: checkAndInvert(s.log_p_value_ref),
        pValueAlt: checkAndInvert(s.log_p_value_alt),
        meanBad: s.mean_bad,
        expSnps: s[key] ? s[key].map(convertBackendExpSnp) : [],
    };
}
function checkAndInvert(num: number): number {
    return num ? -num : num;
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

function convertExpId(id: number | string): string {
    if (typeof id === 'string') {
        return id;
    } else {
        return 'EXP' + addZeros(id);
    }
}

function addZeros(id: number): string {
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
function parseFieldName(active: string): {name: string, allele: "ref" | "alt", tfOrCl: AggType} {

    let allele: "ref" | "alt";
    let aggType: AggType;
    if (active.endsWith(refSuffix)) {
        allele = "ref";
        active = active.replace(refSuffix, "");
    } else {
        allele = "alt";
        active = active.replace(altSuffix, "");
    }
    if (active.endsWith("ATAC")) {
        aggType = "atac";
    }
    if (active.endsWith("DNASE")) {
        aggType = "dnase";
    }
    if (active.endsWith("FAIRE")) {
        aggType = "faire";
    }
    return {
        name: active.slice(0, active.length - 2),
        allele,
        tfOrCl: aggType,
    };
}

function convertOrderByToBackend(active: string, direction: SortDirection): string {
    if (!active || direction === "") {
        return null;
    } else {
        let fieldName: string;
        const parsedName: {name: string, allele: "ref" | "alt", tfOrCl: AggType} = parseFieldName(active);
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

export function convertServerSideModelToServerSideBackendModel(
    model: AsbServerSideFilterModel, filterField: string = 'regexp'): AsbServerSideBackendModel {
    const orderBy: string = convertOrderByToBackend(model.active, model.direction);
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
    return orderBy ? {order_by: orderBy, ...pagination} : pagination;
}
