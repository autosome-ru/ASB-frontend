export interface SnpInfoModel {
    rsId: string;
    chr: string;
    pos: number;
    refBase: string;
    altBase: string;
    transFactors: TfSnpModel[];
    cellLines: ClSnpModel[];

}
export  interface  SnpInfoBackendModel {
    chromosome: string,
    "position": number,
    "ref": string,
    "alt": string,
    "rs_id": number,
    "tf_aggregated_snps": TfSnpBackendModel[],
    "cl_aggregated_snps": ClSnpBackendModel[],

}
export interface ClSnpBackendModel {
    "cl_snp_id": number,
    "cell_line": {
        "cl_id": number,
        "name": string
    },
    "p_value_ref": number,
    "p_value_alt": number,
    "is_asb": boolean,
    "es_ref": number,
    "es_alt": number

}
export interface TfSnpBackendModel {
    "tf_snp_id": number,
    transcription_factor: {
        "tf_id": number,
        "name": string
    },
    "p_value_ref": number,
    "p_value_alt": number,
    "is_asb": boolean,
    "es_ref": number,
    "es_alt": number

}

export interface TfSnpModel {
    name: string;
    pValueRef: number;
    pValueAlt: number;
    meanBad: number;
    effectSizeRef: number;
    effectSizeAlt: number;
}

export interface ClSnpModel {
    name: string;
    pValueRef: number;
    pValueAlt: number;
    meanBad: number;
    effectSizeRef: number;
    effectSizeAlt: number;
}
