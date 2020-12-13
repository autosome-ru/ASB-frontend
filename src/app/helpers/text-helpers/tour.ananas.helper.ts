export function getTextByStepNameAnanas(step: string): {text: string} {
    return {text: getText(step)};
}

function getText(step: string): string {
    switch (step) {
        case 'text-input':
            return 'There are several options to supply the list of SNPs.\n' +
                '(A) A list of dbSNP rs-IDs (one per line);\n' +
                '(B)   Contents of a standard VCF file.\n' +
                '(C) A single genomic interval as "chr:start-end"\n(hg38 1-based genomic coordinates). In this case,\nwe will consider all SNPs with\ncandidate ASBs within the given interval.'
        case 'file-drop':
            return 'Instead of copying-pasting\nyou can also upload a file (gzipped\nvcf is also supported).'
        case 'examples':
            return 'We provide several examples\nto play with (hover over the\nbuttons to check the descriptions)'
        case 'job':
            return 'A previously processed request\ncan be accessed by providing a ticket ID.\nPrevious jobs are saved for 2 days.'
        case 'ticket':
            return 'This is your unique job ticket id.\nYou may save it to access this report\nlater (reports are accessible for 2 days\nsince completion).'
        case 'stats':
            return 'General statistics and enrichment of allele-specific binding events detected in the submitted SNP list.\nNote, that enrichment estimates have limited value\nfor locus-centric analysis (i.e. if a genomic region\nwas submitted) as the analysis involves all ASBs\nand all candidate SNPs in a given region.'
        case 'col-button':
            return 'It is possible to switch between the TF- and cell type-centric reports. Each report is available in the expanded form (all ASB events at submmited SNPs) and collapsed form (showing only the single most significant event for each SNP).'
        case 'odds-table-open':
            return 'Click to show a pie chart and\nresults of enrichment analysis\nfor particular TFs or cell types.'
        case 'odds-table':
            return 'The Fisher\'s exact test P-values\nare FDR-corrected for the number\nof TFs/cell types that have at least\none ASB event at user-submitted SNPs.'
        case 'pie-chart':
            return 'Click on individual segments\nof the chart to filter ASBs\nrelated to a particular TF\nor a cell type.'
        case 'columns-select':
            return 'Additional columns\n(e.g. related to motif annotation)\ncan be selected and displayed.'
        case 'download-table':
            return 'The table can be downloaded in\n.tsv format for further analysis.'
        case 'filter':
            return 'It is possible to apply the\nTF/cell type-wise filtering.'
        default:
            return "";
    }
}
