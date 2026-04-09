"use client"

import type { ScaleEntry } from "@/lib/scale"
import { parseBaseParam } from "@/lib/search-params"

interface ScaleViewProps {
  entries: ScaleEntry[]
  baseParam: string
  font: string
}

export function ScaleView({ entries, baseParam, font }: ScaleViewProps) {
  const bases = parseBaseParam(baseParam)
  const isDualBase = bases.length > 1

  return (
    <div className="flex flex-col gap-5">
      {isDualBase && (
        <div className="flex gap-5 items-center">
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <div className="w-2.5 h-0.5 rounded-full bg-strand-a" />
            Base A ({bases[0]}px)
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <div className="w-2.5 h-0.5 rounded-full bg-strand-b" />
            Base B ({bases[1]}px)
          </div>
        </div>
      )}

      <div className="flex flex-col">
        {entries.map((entry) => {
          const isBase = entry.step === 0
          const strandClass = isDualBase
            ? entry.strand === "b"
              ? "border-l-2 border-l-strand-b pl-3"
              : entry.strand === "both"
                ? "border-l-2 border-l-zinc-400 pl-3"
                : "border-l-2 border-l-strand-a pl-3"
            : ""

          // Cap display font size at 120px for usability
          const displaySize = Math.min(entry.px, 120)

          return (
            <div
              key={entry.step}
              className={`grid items-baseline gap-4 py-3 border-b border-zinc-50 ${strandClass} ${
                isBase
                  ? "bg-zinc-50 rounded-lg px-3 -mx-3 border-b-zinc-100"
                  : ""
              }`}
              style={{
                gridTemplateColumns: "48px 76px 90px 1fr",
              }}
            >
              <span
                className={`text-xs font-mono ${
                  isBase
                    ? "text-zinc-900 font-semibold"
                    : "text-zinc-400"
                }`}
              >
                {entry.step}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {entry.px}px
              </span>
              <span className="text-xs font-mono text-zinc-500">
                {entry.rem}rem
              </span>
              <span
                className="text-zinc-800 truncate"
                style={{
                  fontFamily: font,
                  fontSize: `${displaySize}px`,
                  lineHeight: 1.2,
                }}
              >
                The quick brown fox
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
