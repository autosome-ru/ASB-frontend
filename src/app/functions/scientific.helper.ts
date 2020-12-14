export function writeScientificNum(num: number, precision: number): string {
  if (num === null) {
      return  `<span>n/a</span>`
  }
  const power = Math.ceil(num);
  const realNum = Math.pow(10, -num);
  if (num <= 2) {
    return `<span>${realNum.toFixed(precision)}</span>`;
  }
  const base = (realNum * Math.pow(10, power)).toFixed(precision - 1);
  return `<span>${base}·10<sup>-${power}</sup></span>`;
}
