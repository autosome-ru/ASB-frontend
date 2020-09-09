export function getTextByStepName(step: string, component?: string): {text: string} {
    return {text: getText(step, component)}
}

function getText(step: string, component?: string): string {
    switch (step) {
        case 'sequence':
            return  'Sequence surrounding SNV, ± 25 nts.'
        case 'cell-types-buttons':
            return 'Cell types from the GTRD database\n exhibiting ASB at the SNV.'
                + (component == 'snp' ? '\nClick the links to visit the\n respective GTRD page.' : '')
        case 'transcription-factors-buttons':
            return  'Transcription factors exhibiting\nASB at this SNV.' +
                (component == 'snp' ? '\nClick to visit the UniProt page\n' +
                    ' of the respective protein.' : '')
        case 'search-nearby':
            return  'Search ASBs nearby (±100bp,\n' +
                'either relative to dbSNP ID, if\nfound, or relative to ' +
                'a given\ngenomic interval).'
        case 'genome-browser':
            return 'Open the surrounding region\n in the UCSC Genome Browser.'
        case 'color-scales':
            return 'Color scales used for visual representation\n' +
                ' of the ASB significance thoughout\n the whole SNV report page'
        case 'transcription-factors-stats':
            return 'Detailed information on read counts,\nallelic imbalance,' +
                'and motif annotation\n for the ASBs in regard to \ntranscription ' +
                'factors and cell types.'
        case 'phen-stats':
            return 'Information on phenotype\n associations and eQTLs'
        case 'transcription-factors-columns':
            return 'Additional columns can be shown.'
        case 'motif-analysis':
            return 'Visualization of motif analysis.'
        case 'table':
            return 'Click on a table row to open\n detailed data on individual SNVs\n' +
                'used in statistical aggregation.'
        case 'snp-header':
            return 'SNV position, 1-based. Click on the dbSNP rsID\nto visit the respective dbSNP page'
        case 'search-adv':
            return 'Additional filters are\navailable in "Advanced search".'
        case 'search-by':
            return 'Search ASBs by dbSNP ID\n or by genome position.'
        case 'search-rs':
            return 'Type a dbSNP ID\n(with or without rs prefix).'
        case 'search-pos':
            return 'Use dash "-" to search in a\ngenomic interval e.g. 1-500000' +
                 (component == 'advanced' ? ',\nignored if "any chr" is selected.' : '.' )
        case 'search-example':
            return 'Or click the "Example" button\nto see ADASTRA in action.'
        case 'search-tf-list':
            return 'Look for SNVs with ASBs at the\n' +
                'selected transcription factors only\n' +
                '(start typing and use autocomplete).\n' +
                'TFs are listed according to UniProt IDs.\n' +
                'The complete list of TFs can be found\n' +
                'at the "Browse" page.'
        case 'search-cl-list':
            return 'Look for SNVs with ASBs at the\n' +
                'selected cell types only\n' +
                '(start typing and use autocomplete).\n' +
                'Cell types are named according to the\n ' +
                'GTRD data. The complete list of cell types\ncan be found' +
                'at the "Browse" page.'
        case 'search-download':
            return 'Download search results in TSV format.'
        case 'search-view':
            return 'Allows switching between card\n and table view of search results.'
        case 'search-associations':
            return 'SNPs with associations in all databases'
        case 'search-concordance':
            return 'SNPs concordance'
        default:
            return ''
    }
}
