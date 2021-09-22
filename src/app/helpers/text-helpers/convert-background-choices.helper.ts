import {BackgroundSelect} from "../../models/annotation.model";

export function convertBackgroundChoicesHelper(bc: BackgroundSelect): string {
    switch (bc) {
        case 'LD-EUR':
            return 'LD-islands (EUR)'
        case 'LD-ASN':
            return 'LD-islands (ASN)'
        case 'LD-AFR':
            return 'LD-islands (AFR)'
        case 'LOCAL':
            return 'Local (1 Mbase)'
        case 'WG':
            return 'Whole genome'
    }
}
