export function getTextByStepNameAnanas(step: string): {text: string} {
    return {text: getText(step)};
}

function getText(step: string): string {
    switch (step) {
        case 'text-input':
            return 'There are several options to supply the list of SNPs.\n' +
                '(A) A list of dbSNP rs-IDs (one per line).\n' +
                '(B) Contents of a standard VCF file.'
        case 'file-drop':
            return 'Instead of copying-pasting\nyou can also upload a file (gzipped\nvcf is also supported).'
        case 'examples':
            return 'We provide several examples\nto play with (hover over the\nbuttons to check the descriptions).'
        case 'job':
            return 'A previously processed request\ncan be accessed by providing a ticket ID.\nPrevious jobs are saved for 3 days.'
        case 'ticket':
            return 'This is your unique job ticket id.\nYou may save it to access this report\nlater (reports are accessible for 3 days\nsince completion).'
        case 'sum-head':
            return "The first tab (Summary) contains an overview\nof the ASBs and their relative enrichment\nin the user-submitted list against\nnon-ASB 'candidate' sites."
        case 'chrom-agg':
            return "Logit-aggregated P-value considering\neach ASB-carrying chromosome\nas an independent 'experiment'."
        case 'chrom-table':
            return "Chromosome-level ASB enrichment estimates."
        case 'tf-head':
            return 'Detailed information on ASBs of particular transcription factors.'
        case 'cl-head':
            return 'Detailed information on ASBs in particular cell types.'
        case 'stats':
            return 'General statistics and enrichment of allele-specific\nbinding events detected in the submitted SNP list.'
        case 'col-button':
            return 'Each report is available in the expanded form (all ASB events at submmited SNPs) and collapsed form (showing only the single most significant event for each SNP).'
        case 'odds-table-open':
            return 'Click to show results of enrichment\nanalysis for particular TFs or cell types.'
        case 'odds-table':
            return 'TF- and cell type-level enrichment is always performed against\ngenome-wide background restricted to a particular TF or cell type.\nThe Fisher\'s exact test P-values are FDR-corrected for the\nnumber of TFs/cell types that have at least one ASB event at user-submitted SNPs.'
        case 'pie-chart':
            return 'Click on individual segments\nof the chart to filter ASBs\nrelated to a particular TF\nor a cell type.'
        case 'columns-select':
            return 'Additional columns\n(e.g. related to motif annotation)\ncan be selected and displayed.'
        case 'download-table':
            return 'The table can be downloaded in\n.tsv format for further analysis.'
        case 'filter':
            return 'It is possible to apply the\nTF/cell type-wise filtering.'
        case "fdr-simple":
            return 'Here you can set desired ASB FDR threshold.\n' +
                'Our test suggest ASBs at 5% FDR are very reliable\n' +
                'in terms of motif annotation.'
        default:
            return "No step with name " + step + " found";
    }
}
