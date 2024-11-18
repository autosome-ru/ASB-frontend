export function getTextByStepNameAdastra(step: string, component?: string): {text: string} {
    return {text: getText(step, component)};
}

function getText(step: string, component?: string): string {
    switch (step) {
        case "sequence":
            return  "Sequence surrounding SNV, ± 25 nts.";
        case "cell-types-buttons":
            return "Cell types from the GTRD database\n exhibiting ASV at the SNV."
                + (component == "snp" ? "\nClick the links to visit the\n respective GTRD page." : "");
        case "transcription-factors-buttons":
            return  "Transcription factors exhibiting\nASV at this SNV." +
                (component == "snp" ? "\nClick to visit the UniProt page\n" +
                    " of the respective protein." : "");
        case "search-nearby":
            return  `Search ASVs nearby (±100bp${component == "snp" ? ")" : ", " +
                "either\nrelative to dbSNP ID, if found, or\nrelative to a given genomic interval)."}`;
        case "genome-browser":
            return "Open the surrounding region\n in the UCSC Genome Browser.";
        case "phelige":
            return 'Explore phenotype associations\nwith PheLiGe'
        case "color-scales":
            return "Color scales used for visual representation\n" +
                " of the ASV significance thoughout\n the whole SNV report page";
        case "transcription-factors-stats":
            return "Detailed information on read counts,\nallelic imbalance," +
                "and motif annotation\n for the ASVs in regard to \ntranscription " +
                "factors and cell types.";
        case "phen-stats":
            return "Information on phenotype\n associations and eQTLs";
        case "transcription-factors-columns":
            return "Additional columns can be shown.";
        case "motif-analysis":
            return "Visualization of motif analysis.";
        case "table":
            return "Click on a table row to open\n detailed data on individual SNVs\n" +
                "used in statistical aggregation.";
        case "snp-header":
            return "SNV position, 1-based. Click on the dbSNP rsID\nto visit the respective dbSNP page";
        case "search-adv":
            return "Additional filters are\navailable in \"Advanced search\".";
        case "search-by":
            return "Search ASVs by dbSNP ID\n or by genome position.";
        case "search-rs":
            return "Type a dbSNP ID\n(with or without rs prefix).";
        case "search-pos":
            return "Use dash \"-\" to search in a\ngenomic interval e.g. 1-500000" +
                 ",\nposition ignored if empty.";
        case "search-example":
            return "Or click the \"Example\" button\nto see UDACHA in action.";
        case "search-tf-list":
            return "Look for SNVs with ASVs for the\n" +
                "selected transcription factors only\n" +
                "(start typing and use autocomplete).\n" +
                "TFs are listed according to UniProt IDs.\n" +
                "The complete list of TFs can be found\n" +
                "at the \"Browse\" page.";
        case "search-cl-list":
            return "Look for SNVs with ASVs at the\n" +
                "selected cell types only\n" +
                "(start typing and use autocomplete).\n" +
                "Cell types are named according to the\n " +
                "GTRD data. The complete list of cell types\ncan be found" +
                " at the \"Browse\" page.";
        case "search-download":
            return "Download search results in TSV format.";
        case "switch-release":
            return 'Switch release';
        case "search-view":
            return "Allows switching between card\n and table view of search results.";
        case "search-associations":
            return "Search for SNVs with known\n associations with phenotypes or eQTLs";
        case "search-concordance":
            return "Look for ASVs which are\nconcordant with motif predictions of HOCOMOCO";
        case "search-gene":
            return "Search for ASV sites within a particular\ngene locus (within the gene body and\n 5000bp upstream of the TSS).\n" +
                "GENCODE gene symbols are used as gene\nnames, start typing and use autocomplete."
        case "fdr-simple":
            return 'Here you can set desired ASV FDR threshold.\n' +
                'Our test suggest ASVs at 10% FDR are very reliable\n' +
                'in terms of motif annotation.';
        case "search-eqtl":
            return 'It is possible to specifically look for ASVs\n' +
                'which act as eQTLs for a particular gene'
        default:
            return "";
    }
}
