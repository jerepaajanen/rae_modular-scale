import {
  parseAsString,
  parseAsInteger,
  parseAsFloat,
  parseAsStringLiteral,
} from "nuqs"

import type { ScaleConfig } from "@/lib/scale"

export const searchParamsParsers = {
  base: parseAsString.withDefault("16"),
  ratio: parseAsFloat.withDefault(1.333),
  neg: parseAsInteger.withDefault(2),
  pos: parseAsInteger.withDefault(10),
  round: parseAsInteger.withDefault(1),
  prefix: parseAsString.withDefault("step"),
  font: parseAsString.withDefault("Inter"),
  view: parseAsStringLiteral(["scale", "specimen"] as const).withDefault(
    "scale"
  ),
}

/**
 * Splits a comma-separated base string into an array of numbers.
 * Filters out NaN and non-positive values.
 * Returns at least [16] if parsing fails or yields no valid entries.
 */
export function parseBaseParam(base: string): number[] {
  const parsed = base
    .split(",")
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !Number.isNaN(n) && n > 0)

  return parsed.length > 0 ? parsed : [16]
}

/**
 * Converts raw URL search params into a validated ScaleConfig.
 * Applies clamping and limits to all values.
 */
export function configFromParams(params: {
  base: string
  ratio: number
  neg: number
  pos: number
  round: number
}): ScaleConfig {
  const bases = parseBaseParam(params.base).slice(0, 2)
  const ratio = Math.min(4.0, Math.max(1.01, params.ratio))
  const negativeSteps = Math.min(10, Math.max(0, params.neg))
  const positiveSteps = Math.min(20, Math.max(1, params.pos))
  const rounding = Math.round(Math.min(2, Math.max(0, params.round))) as 0 | 1 | 2

  return {
    bases,
    ratio,
    negativeSteps,
    positiveSteps,
    rounding,
  }
}
