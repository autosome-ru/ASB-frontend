import {MotifConcordanceModel, PhenotypesModel} from "../models/data.model";
import {AsbServerSideModel} from "../models/table.model";

export const version: string = "v1.4.2";
export const releaseName: string = "Waddles";

export const phenotypesToView: {[name: string]: string} = {
    ebi: "EMBL-EBI",
    grasp: "GRASP",
    clinvar: "ClinVar",
    phewas: "PheWAS",
    finemapping: "Finemapping",
    QTL: "GTEx eQTL"
};

export const phenotypesToLink: {[name: string]: (s: string) => string} = {
    ebi: s => "https://www.ebi.ac.uk/gwas/variants/" + s,
    grasp: () => "https://grasp.nhlbi.nih.gov/Search.aspx",
    clinvar: s => "https://www.ncbi.nlm.nih.gov/clinvar/?term=" + s,
    phewas: () => "https://phewascatalog.org/ ",
    finemapping: () => "http://pubs.broadinstitute.org/pubs/finemapping/dataportal.php",
    QTL: s => "https://www.gtexportal.org/home/snp/" + s
};

export const phenotypesModelExample: PhenotypesModel = {
    ebi: [],
    grasp: [],
    clinvar: [],
    phewas: [],
    finemapping: [],
    QTL: [],
};
export const concordanceModelExample: MotifConcordanceModel = {
    'Concordant': false,
    'Discordant': false,
    'Weak Concordant': false,
    'Weak Discordant': false
};

export const initialServerParams: AsbServerSideModel = {
    pageSize: 5,
    pageIndex: 0,
    active: null,
    direction: "",
};
