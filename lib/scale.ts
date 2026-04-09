export type ScaleEntry = {
  step: number
  px: number
  rem: number
  strand: "a" | "b" | "both"
}

export type ScaleConfig = {
  bases: number[]
  ratio: number
  negativeSteps: number
  positiveSteps: number
  rounding: 0 | 1 | 2
}

/**
 * Round a pixel value to a grid.
 * grid=0: raw value (no rounding)
 * grid=1: round to nearest 1px
 * grid=2: round to nearest 2px
 */
export function roundToGrid(px: number, grid: 0 | 1 | 2): number {
  if (grid === 0) return px
  if (grid === 1) return Math.round(px)
  return Math.round(px / 2) * 2
}

/**
 * Convert a pixel value to rem (base 16px), rounded to 4 decimal places.
 */
export function pxToRem(px: number): number {
  return Math.round((px / 16) * 10000) / 10000
}

/**
 * Generate a strand of scale values for a single base.
 * Returns an array of `base * ratio^n` for n in [-negSteps..posSteps].
 */
export function generateStrand(
  base: number,
  ratio: number,
  negSteps: number,
  posSteps: number
): number[] {
  const values: number[] = []
  for (let n = -negSteps; n <= posSteps; n++) {
    values.push(base * Math.pow(ratio, n))
  }
  return values
}

/**
 * Generate a complete modular scale from a configuration.
 *
 * 1. For each base, generate a strand of raw values
 * 2. Round each value using roundToGrid
 * 3. Tag each with strand origin ('a' for first base, 'b' for second)
 * 4. Merge all into one array
 * 5. Sort ascending by px value
 * 6. Deduplicate: if two entries share the same px value, keep one with strand='both'
 * 7. Re-index so the entry closest to base A (first base) gets step 0
 */
export function generateScale(config: ScaleConfig): ScaleEntry[] {
  const { bases, ratio, negativeSteps, positiveSteps, rounding } = config

  type RawEntry = { px: number; strand: "a" | "b" }

  const allEntries: RawEntry[] = []

  bases.forEach((base, baseIndex) => {
    const strandLabel: "a" | "b" = baseIndex === 0 ? "a" : "b"
    const rawValues = generateStrand(base, ratio, negativeSteps, positiveSteps)

    for (const raw of rawValues) {
      const rounded = roundToGrid(raw, rounding)
      allEntries.push({ px: rounded, strand: strandLabel })
    }
  })

  // Sort ascending by px
  allEntries.sort((a, b) => a.px - b.px)

  // Deduplicate: group by px value
  const deduped: { px: number; strand: "a" | "b" | "both" }[] = []

  for (const entry of allEntries) {
    const existing = deduped.find((e) => e.px === entry.px)
    if (existing) {
      // If same px from different strands, mark as 'both'
      if (existing.strand !== entry.strand) {
        existing.strand = "both"
      }
    } else {
      deduped.push({ px: entry.px, strand: entry.strand })
    }
  }

  // Find the index of the entry whose px matches the first base (after rounding)
  const baseARounded = roundToGrid(bases[0], rounding)
  let zeroIndex = deduped.findIndex((e) => e.px === baseARounded)

  // Fallback: if exact match not found, find the closest entry
  if (zeroIndex === -1) {
    let minDiff = Infinity
    deduped.forEach((e, i) => {
      const diff = Math.abs(e.px - baseARounded)
      if (diff < minDiff) {
        minDiff = diff
        zeroIndex = i
      }
    })
  }

  // Assign step numbers: zeroIndex becomes step 0
  const all: ScaleEntry[] = deduped.map((entry, i) => ({
    step: i - zeroIndex,
    px: entry.px,
    rem: pxToRem(entry.px),
    strand: entry.strand,
  }))

  // Trim to requested range so dual-base doesn't balloon the step count
  const entries = all.filter(
    (e) => e.step >= -negativeSteps && e.step <= positiveSteps
  )

  return entries
}
