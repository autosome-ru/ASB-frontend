import {
    AnnotationDataBackendModel,
    AnnotationDataModel,
    AnnotationSnpBackendModel,
    AnnotationSnpModel,
    AsbStatsBackendDataModel, AsbStatsDataModel, CountBackendModel, CountModel,
    PingDataBackendModel,
    PingDataModel,
    StatsDataModel
} from '../../models/annotation.model';
import {stringToNum} from "../helper/check-functions.helper";


function convertCountBackendModelToCountModel(model: CountBackendModel): CountModel {
    return {
        count: model.count,
        expCount: model.background_count,
        name: model.name
    }
}

function convertAnnotationStatsBackendToAnnotationStatsModel(model: AnnotationDataBackendModel): StatsDataModel {
    const stats = model.meta_info

    return {
        // Ticket info
        fdr: model.fdr,
        background: model.background || 'WG',
        processingTime: stats.processing_time,
        // Other fields
        totalSNPs: stats.submitted_snps_count,
        totalUnqiueSNPs: stats.unique_submitted_snps_count,
        undefinedCount: stats.undefined_rs,
        notFound: stats.unique_submitted_snps_count - stats.all.negatives_rs - stats.undefined_rs - stats.all.asbs_rs,
        expRatio: stats.all.expected_asbs_rs + stats.all.expected_negatives_rs > 0 ?
            stats.all.expected_asbs_rs / (stats.all.expected_asbs_rs + stats.all.expected_negatives_rs) * 100 : 0,
        // Overall stats
        asbCount: stats.all.asbs_rs,
        negativesCount: stats.all.negatives_rs,
        ratio: stats.all.negatives_rs + stats.all.asbs_rs > 0 ?
            stats.all.asbs_rs / (stats.all.negatives_rs + stats.all.asbs_rs) * 100 : 0,
        oddsRatio: stringToNum(stats.all.odds_rs),
        pValue: stringToNum(stats.all.log10_p_value_rs),
        // TF-wise stats
        tfNegativesCount: stats.tf.negatives_rs,
        tfAsbs: stats.tf.asbs_rs,
        tfRatio: stats.tf.negatives_rs + stats.tf.asbs_rs > 0 ?
            stats.tf.asbs_rs / (stats.tf.negatives_rs + stats.tf.asbs_rs) * 100 : 0,
        tfOdds: stringToNum(stats.tf.odds_rs),
        tfPvalue: stringToNum(stats.tf.log10_p_value_rs),
        // CL-wise stats
        clNegativesCount: stats.cl.negatives_rs,
        clAsbs: stats.cl.asbs_rs,
        clRatio: stats.cl.negatives_rs + stats.cl.asbs_rs > 0 ?
            stats.cl.asbs_rs / (stats.cl.negatives_rs + stats.cl.asbs_rs) * 100 : 0,
        clOdds: stringToNum(stats.cl.odds_rs),
        clPvalue: stringToNum(stats.cl.log10_p_value_rs),
        // Chromosome-wise stats
        chrPvalue: stringToNum(stats.chr.log10_p_value_rs),
        chrTfPvalue: stringToNum(stats.chr.tf_log10_p_value_rs),
        chrClPvalue: stringToNum(stats.chr.cl_log10_p_value_rs),
        // Charts
        tfAsbList: (stats.tf.asb_counts ?? []).map(convertCountBackendModelToCountModel),
        clAsbList: (stats.cl.asb_counts ?? []).map(convertCountBackendModelToCountModel),
        tfAsbListSum: (stats.tf.asb_counts_top ?? []).map(convertCountBackendModelToCountModel),
        clAsbListSum: (stats.cl.asb_counts_top ?? []).map(convertCountBackendModelToCountModel),
        // Enrichment
        tfAsbData: stats.tf.asb_data ? stats.tf.asb_data.map(convertAsbStatsBackendToAsbStatsModel) : [],
        clAsbData: stats.cl.asb_data ? stats.cl.asb_data.map(convertAsbStatsBackendToAsbStatsModel) : [],
        chrAsbData: stats.chr.asb_data ? stats.chr.asb_data.map(convertAsbStatsBackendToAsbStatsModel) : [],

    };
}
function convertAsbStatsBackendToAsbStatsModel(model: AsbStatsBackendDataModel): AsbStatsDataModel {
    return {
        odds: stringToNum(model.odds),
        asbsRs: model.asbs_rs,
        negativesRs: model.negatives_rs,
        expectedNegativesRs: model.expected_negatives_rs,
        expectedAsbsRs: model.expected_asbs_rs,
        pValue: stringToNum(model.log10_p_value, true),
        fdr: stringToNum(model.log10_fdr === undefined ?
            model.log10_p_value : model.log10_fdr , true),
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
        metaInfo: convertAnnotationStatsBackendToAnnotationStatsModel(model)
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
        effectSizeAlt: model.effect_size_alt,
        effectSizeRef: model.effect_size_ref,
        log10FdrAlt: -model.log10_fdr_alt,
        log10FdrRef: -model.log10_fdr_ref,
        tfUniprotAc: model.tf_uniprot_ac,
        cellTypeId: model.cell_type_gtrd_id,
        isEqtl: model.is_eqtl,
        gtexEqtlTargetGenes: model.gtex_eqtl_target_genes,
        tfBindingPreferences: model.tf_binding_preferences,
        prefAllele: model.preferred_allele,
        refBase: model.ref,
        alleles: model.alleles ? model.alleles.split('/') : [],
        pos: model.position,
        cellType: model.cell_type,
        transcriptionFactor: model.transcription_factor,
        motifConcordance: model.motif_concordance,
        motifLog2Fc: model.motif_log2_fc,
        motifOrientation: model.motif_orientation,
        motifPosition: model.motif_position,
        motifLogPAlt: -model.motif_log_p_alt,
        motifLogPRef: -model.motif_log_p_ref,
        topEffectSize: model.top_effect_size ? model.top_effect_size : 0,
        log10TopFdr: model.log10_top_fdr ? - model.log10_top_fdr : 0
    };
}
