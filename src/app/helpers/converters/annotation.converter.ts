import {
    AnnotationDataBackendModel,
    AnnotationDataModel,
    AnnotationSnpBackendModel,
    AnnotationSnpModel,
    AsbStatsBackendDataModel, AsbStatsDataModel,
    PingDataBackendModel,
    PingDataModel,
    StatsDataBackendModel,
    StatsDataModel
} from '../../models/annotation.model';
import {stringToNum} from "../helper/check-functions.helper";

function convertAnnotationStatsBackendToAnnotationStatsModel(stats: StatsDataBackendModel): StatsDataModel {
    return {
        concordantAsbs: stats.concordant_asbs ? stats.concordant_asbs.map(
            s => {
                return {
                    id: s.tf_name,
                    rsId: 'rs' + s.rs_id,
                    altBase: s.alt,
                    name: s.tf_name,
                    motifConcordance: s.concordance
                };
            }
        ) : null,
        asbCount: stats.all_asbs_rs,
        candidatesCount: stats.all_candidates_rs - stats.all_asbs_rs,
        ratio: stats.all_candidates_rs > 0 ? stats.all_asbs_rs / stats.all_candidates_rs * 100 : 0,
        tfRatio: stats.tf_candidates_rs > 0 ? stats.tf_asbs_rs / stats.tf_candidates_rs * 100 : 0,
        clRatio: stats.cl_candidates_rs > 0 ? stats.cl_asbs_rs / stats.cl_candidates_rs * 100 : 0,
        pValue: stringToNum(stats.all_log10_p_value_rs),
        oddsRatio: stringToNum(stats.all_odds_rs),
        notFound: stats.all_rs - stats.all_candidates_rs,
        clCandidates: stats.cl_candidates_rs - stats.cl_asbs_rs,
        clAsbs: stats.cl_asbs_rs,
        clOdds: stringToNum(stats.cl_odds_rs),
        totalSNPs: stats.all_rs,
        clPvalue: stringToNum(stats.cl_log10_p_value_rs),
        tfCandidates: stats.tf_candidates_rs - stats.tf_asbs_rs,
        processingTime: stats.processing_time,
        processingStartedAt: new Date(Date.now() - new Date(stats.processing_started_at).getTime()),
        lastStatusUpdateAt: stats.last_status_update_at,
        tfPvalue: stringToNum(stats.tf_log10_p_value_rs),
        tfOdds: stringToNum(stats.tf_odds_rs),
        expRatio: stats.expected_fraction_all ? stats.expected_fraction_all * 100 : 0,
        tfAsbs: stats.tf_asbs_rs,
        tfAsbList: stats.tf_asb_counts ? stats.tf_asb_counts : [],
        clAsbList: stats.cl_asb_counts ? stats.cl_asb_counts : [],
        tfAsbData: stats.tf_asb_data ? stats.tf_asb_data.map(convertAsbStatsBackendToAsbStatsModel) : [],
        clAsbData: stats.cl_asb_data ? stats.cl_asb_data.map(convertAsbStatsBackendToAsbStatsModel) : [],
        tfAsbListSum: stats.tf_asb_counts_top ? stats.tf_asb_counts_top : [],
        clAsbListSum: stats.cl_asb_counts_top ? stats.cl_asb_counts_top : [],
    };
}
function convertAsbStatsBackendToAsbStatsModel(model: AsbStatsBackendDataModel): AsbStatsDataModel {
    return {
        odds: stringToNum(model.odds),
        asbs: model.asbs,
        asbsRs: model.asbs_rs,
        candidates: model.candidates,
        candidatesRs: model.candidates_rs,
        pValue: stringToNum(model.log10_p_value, true),
        fdr: stringToNum(model.log10_fdr, true),
        name: model.name
    }
}
export function convertAnnotationBackendToAnnotationModel(
    model: AnnotationDataBackendModel): AnnotationDataModel {
    return {
        expirationDate: model.expiration_date ? new Date(model.expiration_date) : new Date(),
        dateCreated: new Date(model.date_created),
        ticketId: model.ticket_id,
        status: model.status,
        metaInfo: convertAnnotationStatsBackendToAnnotationStatsModel(model.meta_info)
    };
}
export function convertPingBackendToPingModel(
    model: PingDataBackendModel): PingDataModel {
    return {
        processingStartedAt: model.processing_started_at ? new Date(model.processing_started_at) : null,
        expirationDate: model.expiration_date ? new Date(model.expiration_date) : null,
        dateCreated: new Date(model.date_created),
        ticketId: model.ticket_id,
        status: model.status,
        positionInQueue: model.position_in_queue,
        statusDetails: model.status_details,
        elapsedTime: model.elapsed_time
    };
}
export function convertAnnotationSnpBackendToAnnotationSnpModel(
    model: AnnotationSnpBackendModel): AnnotationSnpModel {

    return {
        clinvar: model.clinvar,
        phewas: model.phewas,
        grasp: model.grasp,
        ebi: model.ebi,
        finemapping: model.finemapping,
        altBase: model.alt,
        chr: model.chromosome,
        rsId: typeof model.rs_id === 'string' ? model.rs_id : 'rs' + model.rs_id,
        context: model.sequence,
        esAlt: model.effect_size_alt,
        esRef: model.effect_size_ref,
        fdrAlt: -model.log10_fdr_alt,
        fdrRef: -model.log10_fdr_ref,
        isEqtl: model.is_eqtl,
        targetGenes: model.gtex_eqtl_target_genes,
        tfBindPref: model.tf_binding_preferences,
        prefAllele: model.preferred_allele,
        refBase: model.ref,
        alleles: model.alleles ? model.alleles.split('/') : [],
        pos: model.position,
        cellType: model.cell_type,
        transcriptionFactor: model.transcription_factor,
        motifConcordance: model.motif_concordance,
        motifFc: model.motif_log2_fc,
        motifOrientation: model.motif_orientation,
        motifPosition: model.motif_position,
        motifPAlt: -model.motif_log_p_alt,
        motifPRef: -model.motif_log_p_ref,
        topEs: model.top_effect_size ? model.top_effect_size : 0,
        topFdr: model.log10_top_fdr ? - model.log10_top_fdr : 0
    };
}
