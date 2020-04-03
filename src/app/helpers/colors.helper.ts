export const baseToColors: {[base: string]: string} = {
    "A": "#0074FF",
    "T": "#7900C8",
    "G": "#FF4500",
    "C": "#FFA500"};
export function calculateColor(pValueRef: number,
                               pValueAlt: number,
                               refBase: string,
                               altBase: string): string {
    if (pValueAlt < pValueRef) {
        return baseToColors[refBase] + Math.round(
            Math.min(pValueRef / 20 * 255,
                255)).toString(16);
    } else {
        return baseToColors[altBase] + Math.round(
            Math.min(pValueAlt / 20 * 255,
                255)).toString(16);
    }
}
