This release includes allele-specific binding sites (ASBs) for 778 transcription factors and other DNA-binding proteins and 359 cell types. For each cell type (CL subdirectory) and for each TF (TF subdirectory) there is a separate file listing all putative ASB events at eligible SNVs that pass the necessary coverage thresholds.

Each tsv-file is a plain tab-separated text document containing one line per single-nucleotide variant (SNV) with the following columns.

  'chr': SNV chromosome, hg38 genome assembly
  'pos': SNV position, hg38, 1-based
  'ID': rsSNP ID of the SNV according to the dbSNP build 151
  'ref': reference allele (A,C,G, or T, according to hg38)
  'alt': alternative allele
  'repeat_type': type of the repetitive region (if any) encompassing the SNV according to the UCSC RepeatMasker track
  'n_peak_calls': total number of ChIP-Seq peak calls (across all GTRD peak callers) overlapping the SNV
  'n_peak_callers': number of unique ChIP-Seq peak callers (from the GTRD list: macs, macs2, sissrs, gem, сpics) that identified a peak overlapping the SNV

   'mean_BAD': mean background allelic dosage (BAD) of the genomic segment encompassing the SNV across all the aggregated experiments. Higher BAD values correspond to higher contribution of aneuploidy and local copy-number variants. BAD values are taken into account when estimating statistical significance of individual candidate ASBs (found in different experiments). Mean BAD is computed across all SNV that were used in statistical aggregation of the particular ASB call.
  'mean_SNP_per_segment': mean number of SNPs in a region with the constant common  BAD
  'n_aggregated': the number of datasets in aggregation
 'total_cover': total read coverage of all aggregated SNVs


  'es_mean_ref', 'es_mean_alt': allele-wise effect size (log2),  weighted-average of log-ratios of observed and expected allelic read counts (negative logarithms of individual P-values from each dataset used as weights).

  'fdrp_bh_ref', 'fdrp_bh_alt': allele-wise logit-aggregated and FDR-corrected P-values

For TF-ASBs of transcription factors with motifs available in the HOCOMOCO v.11 (https://hocomoco.autosome.org) core collection, the P-values of the best motif hits were calculated for the Reference and Alternative alleles using SPRY-SARUS (https://github.com/autosome-ru/sarus). The motif position was fixed according to the best hit considering both the Reference and the Alternative alleles on both DNA strands:
  'motif_log_pref': -log10(motif P-value) for the best motif occurrence of the PWM (position weight matrix) for the Ref allele
  'motif_log_palt':  -log10(motif P-value) for the Alt allele
  'motif_fc': motif Fold Change (FC), log2-ratio between motif P-values for the Reference and Alternative alleles. Positive values indicate Alt-ASBs (preferred binding to the Alternative allele). Negative values indicate Ref-ASBs. The value of ‘None’ is assigned in case the PWM was not available.
  'motif_pos': position of the SNV relative to the best PWM hit (taking into account the strand orientation of the motif hit), 0-based
  'motif_orient': '+' or '-', the DNA strand of the best motif PWM hit relative to the chromosome sequence in the genome assembly
  'motif_conc': Motif Concordance, indicates whether the allelic read imbalance agrees with the motif Fold Change (FC, predicted from sequence analysis). The following notation is used:
'None': Motif is not available
'No hit': The best hit P-value is higher than 0.0005
'Weak concordant': The absolute value of FC is less than 2 but consistent with the allelic read imbalance
'Weak discordant': The absolute value of FC is less than 2 and not consistent with the allelic read imbalance
'Concordant': The absolute value of FC is greater or equal than 2 and consistent with allelic read imbalance
'Discordant': The absolute value of FC is greater or equal than 2 but not consistent with allelic read imbalance





Comment:
ASB significance
ASB calling is done separately for each ChIP-Seq experiment. For each candidate ASB site, the P-values for Reference and Alternative allele are calculated separately according to the fitted Negative Binomial Mixture model.

For a particular SNV, the P-values from individual data sets are aggregated for each TF (for ChIP-Seq data from all cell types) and cell types (for ChIP-Seq data from all TFs). The aggregated P-values are then corrected for multiple tested SNPs using Benjamini-Hochberg (FDR) procedure.

ASB effect size
The Effect Size of ASB is calculated separately for Reference and Alternative alleles and is defined as the weighted mean of log-ratios of observed and expected allelic read counts, with weights being -log10 of the respective P-values. The expected read counts are estimated from the fitted Negative Binomial Mixture model.

The Effect Size is not assigned (n/a) if all of the raw individual P-values of an SNV on a particular genome position are equal to 1, considering Ref- and Alt-ASBs separately.

