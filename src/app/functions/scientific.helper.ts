import {pValueString} from "../models/annotation.model";

export function writeScientificNum(num: pValueString, precision: number): string {
  if (num === null) {
      return `<span>n/a</span>`
  }
  if (num == 'infinity') {
      return `<span><10<sup>-300</sup></span>`
  }
  let power = Math.ceil(num);
  const realNum = Math.pow(10, -num);
  if (num <= 2) {
    return `<span>${realNum.toFixed(precision)}</span>`;
  }
  let base = (realNum * Math.pow(10, power)).toFixed(precision - 1);
  if (base === '10.'.padEnd(precision + 2, '0')) {
      base = '1.'.padEnd(precision + 1, '0')
      power = power - 1
  }
  return `<span>${base}·10<sup>-${power}</sup></span>`;
}
