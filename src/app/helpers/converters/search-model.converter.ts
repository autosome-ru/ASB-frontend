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
        startPos: model.start_pos,
        id: model.gene_id,
        name: model.gene_name,
        endPos: model.end_pos,
        snpsCount: model.snps_count
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
