import {PhenotypesModel} from "../models/data.model";
import {AsbServerSideModel} from "../models/table.model";

export const version: string = "v 1.1.2";
export const releaseName: string = "Durland";

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
    pageSize: 10,
    pageIndex: 1,
    active: null,
    direction: "",
};
