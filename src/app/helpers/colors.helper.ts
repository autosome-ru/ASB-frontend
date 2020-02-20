export function calculateColor(pValueRef: number, pValueAlt: number): string {
    if (pValueAlt > pValueRef) {
        return '#FFC20A' + Math.round(
            Math.min(-Math.log(pValueRef) / 20 * 255,
                255)).toString(16)
    } else {
        return '#0C7BDC' +Math.round(
            Math.min(-Math.log(pValueAlt) / 20 * 255,
                255)).toString(16)
    }
}
