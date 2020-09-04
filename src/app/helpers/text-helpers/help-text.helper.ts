import {HelpMessageModel} from "../../models/help-message.model";

export const helpMessagesArray: HelpMessageModel[] = [
    {
        value: 'Coordinate system',
        description: 'Genome positions of all SNPs in the database are vcf/gtf-like (1-based).\n' +
            '\n'
    },
    {
        value: 'BAD',
        description: 'Background allelic Dosage (BAD) is the expected ratio of major to minor allelic frequencies on a particular genomic region.\n' +
            '\n' +
            'For example, if a particular genomic region has the same copy number of both alleles (e.g. 1:1 (diploid), 2:2, or 3:3,) then it has BAD=1 meaning that the expected ratio of reads mapped to alternative alleles on heterozygous SNVs is 1. All triploid regions have BAD=2 and the expected allelic read ratio is either 2 or ½. In general, if the BAD of a particular region is known, then the expected frequencies of allelic reads are 1/(BAD +1) and BAD/(BAD + 1).\n' +
            '\n'
    },
    {
        value: 'ASB significance',
        description: 'ASB calling is done separately for each ChIP-Seq experiment, and the resulting P-values are aggregated for each TF (for ChIP-Seq data from all cell types) and cell types (for ChIP-Seq data from all TFs). The aggregated P-values are then corrected for multiple testing for SNPs in the same transcription factor or cell type using Benjamini-Hochberg procedure.\n' +
            '\n' +
            'On each SNP the P-values for Reference and Alternative allele ASB are calculated separately according to the fitted Negative Binomial distribution.' + '\n\n'
    },
    {
        value: 'Effect Size',
        description: 'The Effect Size of ASB is calculated separately for Reference and Alternative alleles and is defined as the weighted mean of binary logarithms of the ratios of observed to expected (according to the fitted Negative Binomial distribution) allelic read counts, with weights being -log10 P-values.\n' +
            '\n' +
            'The Effect Size of n/a is assigned if all of the raw P-values of the aggregated SNPs on a particular genome position and allele are equal to 1.\n' +
            '\n'
    },
    {
        value: 'Motif P-value',
        description: 'When the motif for the transcription factor was available in the HOCOMOCO v.11 core collection, the motif P-values were calculated for Reference and Alternative allelic variants using SPRY-SARUS v.2.0.2. The position of the motif was chosen in such a way that it corresponds to the best motif P-value (of either Reference or Alternative variant on either chain).\n' +
            '\n'
    },
    {
        value: 'Motif Fold Change',
        description: 'Motif Fold Change is the binary logarithm of the ratio of Reference to Alternative Motif P-values. Positive values indicate ASB with preference to the Alternative allele. n/a is assigned if no motif is available for the transcription factor.\n' +
            '\n'
    }
]
