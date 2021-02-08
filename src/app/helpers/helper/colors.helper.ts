export const baseToColors: {[base: string]: string} = {
    A: "#0074FF",
    T: "#7900C8",
    G: "#FF4500",
    C: "#FFA500"};
export function calculateColor(pValueRef: number,
                               pValueAlt: number,
                               refBase: string,
                               altBase: string): string {
    pValueRef = Math.abs(pValueRef)
    pValueAlt = Math.abs(pValueAlt)
    if (pValueAlt < pValueRef) {
        return calculateColorForOne(pValueRef, refBase);
    } else {
        return calculateColorForOne(pValueAlt, altBase);
    }
}
export function calculateColorForOne(pValue: number,
                                     base: string): string {

    return baseToColors[base] + Math.round(
        Math.min(Math.abs(pValue) / 20 * 255,
            255)).toString(16);

}
