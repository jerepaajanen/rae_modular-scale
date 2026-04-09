import type { ScaleEntry, ScaleConfig } from "./scale"

function configComment(config: ScaleConfig): string {
  const basesStr = config.bases.join(", ")
  return `RAE Modular Scale — ${basesStr}px @ ${config.ratio}`
}

function stepLabel(step: number): string {
  if (step < 0) return `-${Math.abs(step)}`
  return `${step}`
}

/**
 * Format as CSS custom properties inside :root.
 *
 * Negative steps use double-hyphen: --prefix--2
 */
export function formatCSS(
  entries: ScaleEntry[],
  prefix: string,
  config: ScaleConfig
): string {
  const lines: string[] = []

  lines.push(`/* ${configComment(config)} */`)
  lines.push(`:root {`)

  for (const entry of entries) {
    const varName =
      entry.step < 0
        ? `--${prefix}--${Math.abs(entry.step)}`
        : `--${prefix}-${entry.step}`
    lines.push(`  ${varName}: ${entry.rem}rem; /* ${entry.px}px */`)
  }

  lines.push(`}`)

  return lines.join("\n")
}

/**
 * Format as SCSS variables and a $type-scale map.
 */
export function formatSCSS(
  entries: ScaleEntry[],
  prefix: string,
  config: ScaleConfig
): string {
  const lines: string[] = []

  lines.push(`// ${configComment(config)}`)
  lines.push("")

  const varNames: string[] = []

  for (const entry of entries) {
    const varName =
      entry.step < 0
        ? `$${prefix}--${Math.abs(entry.step)}`
        : `$${prefix}-${entry.step}`
    varNames.push(varName)
    lines.push(`${varName}: ${entry.rem}rem;`)
  }

  lines.push("")
  lines.push(`$type-scale: (`)

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const label = stepLabel(entry.step)
    const comma = i < entries.length - 1 ? "," : ""
    lines.push(`  "${label}": ${varNames[i]}${comma}`)
  }

  lines.push(`);`)

  return lines.join("\n")
}

/**
 * Format as a Tailwind CSS fontSize configuration object.
 */
export function formatTailwind(
  entries: ScaleEntry[],
  prefix: string,
  config: ScaleConfig
): string {
  const lines: string[] = []

  lines.push(`// ${configComment(config)}`)
  lines.push(``)
  lines.push(`fontSize: {`)

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const key =
      entry.step < 0
        ? `${prefix}--${Math.abs(entry.step)}`
        : `${prefix}-${entry.step}`
    const comma = i < entries.length - 1 ? "," : ""
    lines.push(
      `  '${key}': ['${entry.rem}rem', { lineHeight: '1.5' }]${comma}`
    )
  }

  lines.push(`}`)

  return lines.join("\n")
}

/**
 * Format as pretty-printed JSON.
 */
export function formatJSON(
  entries: ScaleEntry[],
  _prefix: string,
  config: ScaleConfig
): string {
  const output = {
    meta: {
      generator: configComment(config),
      bases: config.bases,
      ratio: config.ratio,
      rounding: config.rounding,
    },
    scale: entries.map((entry) => ({
      step: entry.step,
      px: entry.px,
      rem: entry.rem,
      strand: entry.strand,
    })),
  }

  return JSON.stringify(output, null, 2)
}
