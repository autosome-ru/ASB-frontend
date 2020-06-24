import {PhenotypesModel} from "../models/data.model";
import {AsbServerSideModel} from "../models/table.model";

export const version: string = "v 1.1.3";
export const releaseName: string = "Waddles";

export const phenotypesToView: {[name: string]: string} = {
    ebi: "EMBL-EBI",
    grasp: "GRASP",
    clinvar: "ClinVar",
    phewas: "PheWAS",
    finemapping: "Finemapping",
    QTL: "QTL"
};

export const phenotypesModelExample: PhenotypesModel = {
    ebi: [],
    grasp: [],
    clinvar: [],
    phewas: [],
    finemapping: [],
    QTL: [],
};

export const initialServerParams: AsbServerSideModel = {
    pageSize: 5,
    pageIndex: 0,
    active: null,
    direction: "",
};
