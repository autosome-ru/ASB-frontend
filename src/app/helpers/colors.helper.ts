export function calculateColor(pValueRef: number, pValueAlt: number): string {
    if (pValueAlt < pValueRef) {
        return "#FFC20A" + Math.round(
            Math.min(pValueRef / 20 * 255,
                255)).toString(16);
    } else {
        return "#0C7BDC" + Math.round(
            Math.min(pValueAlt / 20 * 255,
                255)).toString(16);
    }
}
