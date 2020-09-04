import {
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
        aggregatedSnpCount: model.aggregated_snps_count,
    };
}

export function formCheckboxesToList(form: Partial<SearchQueryModel>, type?: 'phenotypes' | 'concordance'): string {
    let result: string = "";
    Object.keys(type == 'concordance' ? concordanceModelExample : phenotypesModelExample)
        .forEach(s => {
        if (s && form[s]) {
            result = (result ? result + "," : "") + s;
        }
    });
    return result;
}
