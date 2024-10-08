import { Locator } from "@playwright/test";

/**
 * Relates a threshold level for a swatch control defined by its Locator along with the threshold's swatch color
 * Expected flow levels range from "base" (+0 implied), to "base+1", "base+2", ... "base+n" where n is the number of thresholds
 * available between "base" and "high", with "high" being the highest threshold.
 *
 * The meta key allows binding the threshold to a particular node or edge, depending on its given meta.type.
 * For a meta.type of 'edgee', meta.endpoints contains an array of string tuples, with each one representing an az pairing.
 * For a meta.type of 'node', meta.name is the name of the node.
 */
export interface IThreshold {
  expectedFlow: string;
  locator: Locator;
  swatchColor: string;
  meta?: {
    type: 'edge' | 'node',
    endpoints?: Array<string>,
    name?: string
  }
}