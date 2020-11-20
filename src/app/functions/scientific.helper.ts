export function writeScientificNum(num, precision): string {
  const power = Math.round(num);
  const realNum = Math.pow(10, -num);
  if (num <= 2) {
    return `<span>${realNum.toFixed(precision)}</span>`;
  }
  const base = (realNum * Math.pow(10, power)).toFixed(precision - 1);
  return `<span>${base}·10<sup>-${power}</sup></span>`;
}
