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
        default:
            return ''
    }
}
