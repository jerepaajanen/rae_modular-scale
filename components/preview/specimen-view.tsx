"use client"

import type { ScaleEntry } from "@/lib/scale"

interface SpecimenViewProps {
  entries: ScaleEntry[]
  font: string
}

function getEntry(entries: ScaleEntry[], step: number): ScaleEntry | undefined {
  const exact = entries.find((e) => e.step === step)
  if (exact) return exact

  // Fallback: find the nearest available step
  let nearest: ScaleEntry | undefined
  let minDist = Infinity
  for (const entry of entries) {
    const dist = Math.abs(entry.step - step)
    if (dist < minDist) {
      minDist = dist
      nearest = entry
    }
  }
  return nearest
}

function StepLabel({ entry }: { entry: ScaleEntry }) {
  return (
    <span className="block text-[11px] text-zinc-400 font-mono mt-1.5">
      Step {entry.step} — {entry.px}px / {entry.rem}rem
    </span>
  )
}

export function SpecimenView({ entries, font }: SpecimenViewProps) {
  if (entries.length === 0) return null

  const sorted = [...entries].sort((a, b) => a.step - b.step)
  const highestStep = sorted[sorted.length - 1].step
  const lowestStep = sorted[0].step

  const display = getEntry(entries, highestStep)!
  const h1 = getEntry(entries, Math.min(6, highestStep - 1))!
  const h2 = getEntry(
    entries,
    Math.min(4, Math.floor((highestStep + lowestStep) / 2))
  )!
  const h3 = getEntry(entries, 2)!
  const body = getEntry(entries, 0)!
  const small = getEntry(entries, Math.max(-1, lowestStep))!
  const xs = getEntry(entries, -2)

  return (
    <div className="flex flex-col gap-8" style={{ fontFamily: font }}>
      {/* Display heading */}
      <div>
        <p
          className="text-zinc-900 leading-[1.1] tracking-tight"
          style={{ fontSize: `${Math.min(display.px, 120)}px` }}
        >
          Typography sets the tone
        </p>
        <StepLabel entry={display} />
      </div>

      {/* H1 */}
      <div>
        <h1
          className="text-zinc-900 leading-tight"
          style={{ fontSize: `${Math.min(h1.px, 96)}px` }}
        >
          A modular scale brings harmony
        </h1>
        <StepLabel entry={h1} />
      </div>

      {/* Body paragraph */}
      <div>
        <p
          className="text-zinc-700 leading-relaxed max-w-[65ch]"
          style={{ fontSize: `${body.px}px` }}
        >
          A modular scale is a sequence of numbers that relate to one another
          through a consistent ratio. When applied to typography, it creates a
          natural visual rhythm that guides the reader through the content.
          Proportional sizing feels intentional, not arbitrary.
        </p>
        <StepLabel entry={body} />
      </div>

      {/* H2 */}
      <div>
        <h2
          className="text-zinc-900 leading-snug"
          style={{ fontSize: `${Math.min(h2.px, 72)}px` }}
        >
          Subheadings create structure
        </h2>
        <StepLabel entry={h2} />
      </div>

      {/* Body paragraph */}
      <div>
        <p
          className="text-zinc-700 leading-relaxed max-w-[65ch]"
          style={{ fontSize: `${body.px}px` }}
        >
          Each level of your type hierarchy serves a purpose. Headings signal
          importance and break content into digestible sections, while body text
          maintains comfortable readability at its base size.
        </p>
        <StepLabel entry={body} />
      </div>

      {/* H3 */}
      <div>
        <h3
          className="text-zinc-800 leading-snug"
          style={{ fontSize: `${h3.px}px` }}
        >
          Details matter at every level
        </h3>
        <StepLabel entry={h3} />
      </div>

      {/* Small / caption text */}
      <div>
        <p
          className="text-zinc-500 leading-normal"
          style={{ fontSize: `${small.px}px` }}
        >
          Captions and labels use smaller sizes from the scale to maintain
          hierarchy without competing with primary content.
        </p>
        <StepLabel entry={small} />
      </div>

      {/* XS if available */}
      {xs && (
        <div>
          <p
            className="text-zinc-400 leading-normal"
            style={{ fontSize: `${xs.px}px` }}
          >
            Fine print, footnotes, and metadata sit at the smallest end of the
            scale.
          </p>
          <StepLabel entry={xs} />
        </div>
      )}
    </div>
  )
}
