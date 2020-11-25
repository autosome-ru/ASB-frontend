import {ConcordanceBackendModel, SnpGenPosModel, TfSnpModel} from './data.model';

export interface AnnotationDataModel {
  ticketId: string;
  status: string;
  dateCreated: Date;
  expirationDate: Date;
  metaInfo: StatsDataModel;
}
export interface StatsDataModel {
  asbCount: number;
  concordantAsbs: Partial<TfSnpModel>[];
  candidatesCount: number;
  ratio: number;
  tfRatio: number;
  clRatio: number;
  pValue: number;
  notFound: number;
  totalSNPs: number;
  oddsRatio: number;
  clAsbs: number;
  clCandidates: number;
  clPvalue: number;
  clOdds: number;
  processingTime: number;
  tfAsbs: number;
  tfCandidates: number;
  tfPvalue: number;
  tfOdds: number;
}

export interface StatsDataBackendModel {
  all_rs: number;
  all_asbs: number;
  all_candidates: number;
  all_log10_p_value: number;
  all_odds: number;
  cl_asbs: number;
  cl_candidates: number;
  cl_log10_p_value: number;
  cl_odds: number;
  processing_time: number;
  concordant_asbs: ConcordanceBackendModel[];
  tf_asbs: number;
  tf_candidates: number;
  tf_log10_p_value: number;
  tf_odds: number;
}

export interface AnnotationDataBackendModel {
  ticket_id: string;
  date_created: string;
  expiration_date: string;
  status: string;
  meta_info: StatsDataBackendModel;
}

export interface AnnotationSnpBackendModel {
  chromosome: string;
  position: number;
  sequence: string;
  rs_id: number | string;
  ref: string;
  alt: string;
  cell_type?: string;
  log10_fdr_ref: number;
  log10_fdr_alt: number;
  transcription_factor?: string;
  supporting_tfs?: string;
  supporting_cell_types?: string;
}

export interface AnnotationSnpModel extends SnpGenPosModel {
  cellType?: string;
  aggregatedTFs?: string;
  transcriptionFactor?: string;
  aggregatedCellTypes?: string;
  fdrRef: number;
  fdrAlt: number;
}
