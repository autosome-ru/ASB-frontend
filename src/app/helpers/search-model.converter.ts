import {
    SearchHintBackendModel,
    SearchHintModel, SearchQueryModel,
} from "../models/searchQueryModel";
import {phenotypesModelExample} from "./constants";

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
        aggregatedSnpCount: model.aggregated_snps_count,
    };
}

export function phenotypesFormToList(form: Partial<SearchQueryModel>): string {
    let result: string = "";
    Object.keys(phenotypesModelExample).forEach(s => {
        if (s && form[s]) {
            result = (result ? result + "," : "") + s;
        }
    });
    return result;
}
