UDACHA release IceKing (2023): README
-|=====================================|-

This release includes allele-specific chromatin accessibility sites (ASVs) obtained by meta-analysis of DNase-/ATAC-/FAIRE-Seq read alignments of GTRD v. 21.12.

Release files structure:
Each experiment type folder contains multiple separate files listing all putative ASV events in a particular cell type at eligible SNVs that pass the necessary coverage thresholds.

Each tsv-file is a plain tab-separated text document containing one line per single-nucleotide variant (SNV) with the following columns.

  'chr': SNV chromosome, hg38 genome assembly
  'start', 'end': bed-style SNV position, hg38, 0-based start, 1-based end
  'mean_BAD': mean background allelic dosage (BAD) of the genomic segment encompassing the SNV across all the aggregated experiments. Higher BAD values correspond to the higher contribution of aneuploidy and local copy-number variants. BAD values are taken into account when estimating the statistical significance of individual candidate ASVs (found in different experiments). Mean BAD is computed across all SNV that were used in the statistical aggregation of the particular ASV call.
  'id': rsSNP ID of the SNV according to the dbSNP build 151
  'max_cover': maximal read coverage across all aggregated SNVs
  'ref': reference allele (A,C,G, or T, according to hg38)
  'alt': alternative allele
  'n_reps: number of aggregated observations (datasets) for a particular ASV

  'ref_comb_es ', 'alt_comb_es': allele-wise effect size (log2),  weighted-average of log-ratios of observed and expected allelic read counts (negative logarithms of individual P-values from each dataset used as weights).

  'ref_comb_pval', 'alt_comb_pval': allele-wise logit-aggregated and FDR-corrected P-values

  'ref_fdr_comb_pval', 'alt_fdr_comb_pval': allele-wise logit-aggregated and FDR-corrected P-values

  'pref_allele': preferred allele (ref or alt)
  'comb_pval': ASV P-value, best of ref and alt

  'fdr_comb_pval': ASV corrected P-value, best of ref and alt

-|============================|-
Further comments and details

ASV significance
ASV calling is done separately for each experiment. For each candidate ASVx site, the P-values for Reference and Alternative allele are calculated separately according to the fitted MIXALIME Mixture model accounting for different assignment of the alleles to the higher or lower DNA copies in genomic regions with BAD > 1. Prior mixture weights obtained with the global fit across SNVs were updated with Bayesian estimation separately for each SNV. For a particular SNV, the P-values from individual data sets are aggregated with the logit (Mudholkar-George) method for each cell type. The aggregated P-values are then corrected for multiple tested SNPs using Benjamini-Hochberg (FDR) procedure.

ASV effect size
The Effect Size of an ASV event is calculated separately for Reference and Alternative alleles and is defined as the weighted mean of log-ratios of observed and expected allelic read counts, with weights being -log10 of the respective P-values. The expected read counts are estimated from the MIXALIME Mixture model accounting for different assignments of the allies to the higher or lower DNA copies in genomic regions with BAD > 1. Prior mixture weights obtained with the global fit across SNVs were updated with Bayesian estimation separately for each SNV. The Effect Size is not assigned (n/a) if all the raw individual P-values of an SNV on a particular genome position are equal to 1, considering Ref- and Alt-ASVs separately.

