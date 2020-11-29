import {
    AnnotationDataBackendModel,
    AnnotationDataModel,
    AnnotationSnpBackendModel,
    AnnotationSnpModel, StatsDataBackendModel, StatsDataModel
} from '../../models/annotation.model';

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
        pValue: stats.all_log10_p_value,
        oddsRatio: stats.all_odds,
        notFound: stats.all_rs - stats.all_candidates_rs,
        clCandidates: stats.cl_candidates_rs - stats.cl_asbs_rs,
        clAsbs: stats.cl_asbs_rs,
        clOdds: stats.cl_odds,
        totalSNPs: stats.all_rs,
        clPvalue: stats.cl_log10_p_value,
        tfCandidates: stats.tf_candidates_rs - stats.tf_asbs_rs,
        processingTime: stats.processing_time,
        processingStartedAt: new Date(new Date().getTime() - new Date(stats.processing_started_at).getTime()),
        lastStatusUpdateAt: stats.last_status_update_at,
        statusDetails: stats.status_details,
        tfPvalue: stats.tf_log10_p_value,
        tfOdds: stats.tf_odds,
        tfAsbs: stats.tf_asbs_rs,
        tfAsbList: stats.tf_asb_counts ? stats.tf_asb_counts : [],
        clAsbList: stats.cl_asb_counts ? stats.cl_asb_counts : []
    };
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

export function convertAnnotationSnpBackendToAnnotationSnpModel(
    model: AnnotationSnpBackendModel): AnnotationSnpModel {

    return {
        altBase: model.alt,
        chr: model.chromosome,
        rsId: typeof model.rs_id === 'string' ? model.rs_id : 'rs' + model.rs_id,
        context: model.sequence,
        fdrAlt: -model.log10_fdr_alt,
        fdrRef: -model.log10_fdr_ref,
        isEqtl: model.is_eqtl,
        targetGenes: model.gtex_eqtl_target_genes,
        tfBindPref: model.tf_binding_preferences,
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
    };
}
