export function getTextByStepNameAnanas(step: string): {text: string} {
    return {text: getText(step)};
}

function getText(step: string): string {
    switch (step) {
        case 'text-input':
            return 'Provide either SNP rs-IDs,\none per line or a single genomic\ninterval in the form chr:start-end\naccording to hg38, 1-based)'
        case 'file-drop':
            return 'You can also provide a file with\nrs-IDs, a single genomic\ninterval, or a VCF file'
        case 'examples':
            return 'To start with, click\nhere to try some examples\n(hover over to see the description)'
        case 'job':
            return 'You can navigate to a previously\nprocessed request result by\ntyping in a ticket ID'
        case 'ticket':
            return 'This is your ticket id.\nOne may want to save it\nto be able to access\nthis report later.'
        case 'stats':
            return 'The general statistics and ASB-enrichment of the user-submited SNPs (counting unique rs-IDs in the input data or all candidate SNPs in the interval if the search by a genomic locus was performed).'
        case 'col-button':
            return 'You can switch between the TFs and cell types\nreports as well as between expanded\n(showing all submited SNPs) and collapsed\n(showing the single most significant TF / cell types\nfor each rs-ID) versions of the report.'
        case 'odds-table-open':
            return 'Click here to show particular\nTFs / cell types ASB enrichment analysis'
        case 'odds-table':
            return 'Raw enrichment P-values are FDR-corrected on the TFs/cell types that have at least one ASB among user-submited SNPs.'
        case 'pie-chart':
            return 'Click on the segments of the chart\nto apply a filter "only show ASBs of\nthe particular TF / cell type"'
        case 'columns-select':
            return 'Additional columns can be shown'
        case 'download-table':
            return 'You can also download the table\ndisplayed below in .tsv format'
        case 'filter':
            return 'TF / cell type-wise filtering\ncan also be applied'
        default:
            return "";
    }
}
