import {
    SearchByGeneNameHintBackendModel,
    GeneModel,
    SearchHintBackendModel,
    SearchHintModel, SearchQueryModel,
} from "../../models/search-query.model";
import {concordanceModelExample, phenotypesModelExample} from "../constants/constants";

export function convertSearchHintBackendModelToSearchHintModel(
    model: SearchHintBackendModel,
): SearchHintModel;
export function convertSearchHintBackendModelToSearchHintModel(
    model: Partial<SearchHintBackendModel>,
): Partial<SearchHintModel>;
export function convertSearchHintBackendModelToSearchHintModel(
    model: Partial<SearchHintBackendModel>
): Partial<SearchHintModel> {
    return {
        name: model.name,
        aggregatedSnpCount005: model.aggregated_snps_count005,
        aggregatedSnpCount: model.aggregated_snps_count,
    };
}

export function convertSearchByGeneNameHintBackendToSearchByGeneHintModel(
    model: SearchByGeneNameHintBackendModel): GeneModel {
    if (!model) return null
    return {
        chr: model.chromosome,
        startPos: model.locus_start,
        id: model.gene_id,
        name: model.gene_name,
        endPos: model.locus_end,
        snpsCount: model.snps_count,
        snpsCount005: model.snps_count005,
        eqtlCount: model.eqtl_snps_count,
        eqtlCount005: model.eqtl_snps_count005
    }
}

export function formCheckboxesToList(form: Partial<SearchQueryModel>, type?: "phenotypes" | "concordance", forBackend?: boolean): string {
    let result = "";
    Object.keys(type == "concordance" ? concordanceModelExample : phenotypesModelExample)
        .forEach(s => {
        if (s && form[s]) {
            result = (result ? result + "," : "") + (forBackend ? s != 'Other' ? s : 'No Hit,None' : s);
        }
    });
    return result;
}
