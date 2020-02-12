export interface SnpInfoModel {
    rsId: string;
    chr: string;
    pos: number;
    refBase: string;
    altBase: string;
    dbId: number;
    transFactors: TfSnpModel[];
    cellLines: {
        name: string;

    }[];

}

export interface TfSnpModel {
    name: string;
    pValue: number;
    meanBad: number;
    effectSize: number;
}
