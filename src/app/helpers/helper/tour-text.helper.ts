export function getTextByStepName(step: string, component?: string): {text: string} {
    return {text: getText(step, component)}
}

function getText(step: string, component?: string): string {
    switch (step) {
        case 'sequence':
            return  'SNV genomic context\n +/- 25 nucleotides'
        case 'cell-types-buttons':
            return 'Cell types from GTRD database\n' +
                'having ASB at this SNV.' + (component == 'snp' ? '\nClick for GTRD link.' : '')
        case 'transcription-factors-buttons':
            return  'Transcription factors from GTRD database\n' +
                'having ASB at this SNV.' + (component == 'snp' ? '\n Click to go to the UNIPROT page.' : '')
        case 'search-nearby':
            return  'Search ASB nearby SNV position +/-100bp'
        case 'color-scales':
            return 'Color scales'
        case 'transcription-factors-stats':
            return 'Transcription factors and cell types stats'
        case 'phen-stats':
            return 'Phenotypes stats'
        case 'transcription-factors-columns':
            return 'Choose additional columns if needed'
        case 'motif-analysis':
            return 'Picture for motif analysis'
        case 'table':
            return 'Click on table row to open additional statistics'
        case 'snp-header':
            return 'SNV position, 1-based.\nClick on id for dbSNP link'
        case 'search-adv':
            return 'For additional filters use "Advanced search"'
        case 'search-by':
            return 'Search ASB by dbSNP ID or by genome position'
        case 'search-rs':
            return 'Type some ID\n(with or without rs prefix)'
        case 'search-pos':
            return 'To search by interval use "-"\n e.g. 1-500000'
        case 'search-example':
            return 'Or just click the example button'
        case 'search-tf-list':
            return 'TF list to search SNP with ASB in all of them.\n' +
                'Type something for autocomplete suggestions\nTo see the list of all ' +
                'TFs use "Browse" page'
        case 'search-cl-list':
            return 'List of cell types to search SNP with ASB in all of them.\n' +
                'Type something for autocomplete suggestions\nTo see the list of all ' +
                'cell types use "Browse" page'
        case 'search-download':
            return 'Use to download search results in TSV format'
        case 'search-view':
            return 'Use to switch between card and table view'
        case 'search-associations':
            return 'SNPs with associations in all databases'
        case 'search-concordance':
            return 'SNPs with any concordance from provided'
        default:
            return ''
    }
}
