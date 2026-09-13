/** @import { Product } from "./model.js" */
/** @typedef {{ mode: "gross" | "net", rate: number }} Policy */
/** @type {Product} */
export const product = { name: "笔", price: 10 };
/** @satisfies {Policy} */
export const policy = { mode: "gross", rate: 0.1 };

/**
 * @param {number} price
 * @param {number} [rate=0]
 * @returns {number}
 */
export function total(price, rate = 0) {
  return price * (1 + rate);
}

/**
 * @callback PriceRule
 * @param {number} value
 * @returns {number}
 */
/** @type {PriceRule} */
export const round = value => Math.round(value);

/**
 * @template T
 * @param {T} value
 * @returns {T}
 */
export function identity(value) { return value; }

/** @param {unknown} value */
export function keep(value) { return value; }
