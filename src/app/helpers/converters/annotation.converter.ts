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
    asbCount: stats.all_asbs,
    candidatesCount: stats.all_candidates - stats.all_asbs,
    ratio: stats.all_candidates > 0 ? stats.all_asbs / stats.all_candidates * 100 : 0,
    tfRatio: stats.tf_candidates > 0 ? stats.tf_asbs / stats.tf_candidates * 100 : 0,
    clRatio: stats.cl_candidates > 0 ? stats.cl_asbs / stats.cl_candidates * 100 : 0,
    pValue: stats.all_log10_p_value,
    oddsRatio: stats.all_odds,
    notFound: stats.all_rs - stats.all_candidates,
    clCandidates: stats.cl_candidates - stats.cl_asbs,
    clAsbs: stats.cl_asbs,
    clOdds: stats.cl_odds,
    totalSNPs: stats.all_rs,
    clPvalue: stats.cl_log10_p_value,
    tfCandidates: stats.tf_candidates  - stats.tf_asbs,
    processingTime: stats.processing_time,
    tfPvalue: stats.tf_log10_p_value,
    tfOdds: stats.tf_odds,
    tfAsbs: stats.tf_asbs
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
    refBase: model.ref,
    pos: model.position,
    cellType: model.cell_type,
    aggregatedTFs: model.supporting_tfs,
    transcriptionFactor: model.transcription_factor,
    aggregatedCellTypes: model.supporting_cell_types
  };
}
