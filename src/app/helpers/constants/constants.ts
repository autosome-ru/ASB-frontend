import {MotifConcordanceModel, PhenotypesModel} from "../../models/data.model";
import {AsbServerSideModel} from "../../models/table.model";

export const updateCheckInterval: number = 24 * 60 * 60 * 1000
export const phenotypesToView: {[name: string]: string} = {
    ebi: "EMBL-EBI",
    grasp: "GRASP",
    clinvar: "ClinVar",
    phewas: "PheWAS",
    finemapping: "Finemapping",
    qtl: "GTEx eQTL"
};

export const phenotypesToLink: {[name: string]: (s: string) => string} = {
    ebi: s => "https://www.ebi.ac.uk/gwas/variants/" + s,
    grasp: () => "https://grasp.nhlbi.nih.gov/Search.aspx",
    clinvar: s => "https://www.ncbi.nlm.nih.gov/clinvar/?term=" + s,
    phewas: () => "https://phewascatalog.org/ ",
    finemapping: () => "http://pubs.broadinstitute.org/pubs/finemapping/dataportal.php",
    qtl: s => "https://www.gtexportal.org/home/snp/" + s
};

export const phenotypesModelExample: PhenotypesModel = {
    ebi: [],
    grasp: [],
    clinvar: [],
    phewas: [],
    finemapping: [],
    qtl: [],
};
export const concordanceModelExample: MotifConcordanceModel = {
    Concordant: false,
    Discordant: false,
    "Weak Concordant": false,
    "Weak Discordant": false,
    "Other": false,
};

export const initialServerParams: AsbServerSideModel = {
    pageSize: 5,
    pageIndex: 0,
    active: null,
    direction: "",
};
enum Concordance {
    "Discordant",
    "Weak Discordant",
    "Weak Concordant",
    "Concordant",
}
export function compareConcordance(a: string, b: string): number {
    return Concordance[a] - Concordance[b];
}

export const fdrOptions: string[] = ['0.01', '0.05', '0.1', '0.15', '0.25']
export const esOptions: string[] = ['0', '1', '2']
