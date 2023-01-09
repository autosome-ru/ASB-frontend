import {AsbStatsDataModel, pValueString} from "../../models/annotation.model";
import {ChartDataModel} from "../../models/chart-data.model";
import {round} from "lodash";


export interface funcDataModel {
    observed: (obj: AsbStatsDataModel) => number;
    expected: (obj: AsbStatsDataModel) => number;
    labels: (obj: AsbStatsDataModel) => string;
    obsColors: (obj: AsbStatsDataModel) => string;
    expColors: (obj: AsbStatsDataModel) => string;
    pointLabels: (obj: AsbStatsDataModel) => [string, string];
    FDRs: (obj: AsbStatsDataModel) => string;
}

function applyFunc(funcs: funcDataModel, array: any[]) {
    const result = {}
    Object.keys(funcs).forEach(funcName =>
        result[funcName] = array.map(funcs[funcName])
    )
    return result
}

function getColor(pValue: pValueString, baseColor: string = 'red', wrongColor: string = 'grey') {
    return pValue === 'infinity' ? baseColor :
        Math.abs(pValue) >= -Math.log10(0.055) ? baseColor : wrongColor
}


export function getChartData(chrAsbData: AsbStatsDataModel[]): ChartDataModel {
    const funcs: funcDataModel = {
        labels: s => s.name,
        obsColors: s => {
            return getColor(s.fdr, '#06cd99', '#808080')
        },
        expColors: s => getColor(s.fdr, '#f1c232', '#B8B8B8'),
        observed: s => s.asbsRs / (s.asbsRs + s.negativesRs),
        expected: s => s.expectedAsbsRs / (s.expectedAsbsRs + s.expectedNegativesRs),
        pointLabels: s => [`Observed: ${s.asbsRs} / ${s.asbsRs + s.negativesRs} (${(s.asbsRs / (s.asbsRs + s.negativesRs))?.toFixed(2)})`,
            `Expected: ${s.expectedAsbsRs} / ${s.expectedAsbsRs + s.expectedNegativesRs} (${(s.expectedAsbsRs / (s.expectedAsbsRs + s.expectedNegativesRs))?.toFixed(2)})`],
        FDRs: s => `FDR: ${roundPValString(s.fdr, true)}; OR: ${roundPValString(s.odds)}`
    }
    return applyFunc(funcs, chrAsbData.filter(p => p.asbsRs > 0)) as ChartDataModel;
}

function roundPValString(num: pValueString, toExp=false): string {
    if (num === 'infinity') {
        return num
    } else {
        if (toExp) {
            let pow = round(num, 0)
            if (Math.pow(10, num - pow) < 1) {
                pow -=1
            }
            if (pow < -2) {

                return `${Math.pow(10, num - pow)?.toFixed(1)}*10^${pow}`
            } else {
                return Math.pow(10, num)?.toFixed(2)
            }

        } else {
            return num?.toFixed(2);
        }

    }
}
