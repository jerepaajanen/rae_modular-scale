"use client"

import { useEffect } from "react"
import { useScaleConfig } from "@/hooks/use-scale-config"
import { ScaleView } from "@/components/preview/scale-view"
import { SpecimenView } from "@/components/preview/specimen-view"
import { FontPicker } from "@/components/preview/font-picker"
import { ExportPanel } from "@/components/export/export-panel"
import { loadGoogleFont } from "@/lib/fonts"

export function PreviewArea() {
  const { params, setParams, entries } = useScaleConfig()

  useEffect(() => {
    loadGoogleFont(params.font)
  }, [params.font])

  return (
    <div className="flex-1 flex flex-col bg-white min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between px-7 py-3.5 border-b border-zinc-100">
        {/* Tab pills */}
        <div className="flex gap-1" role="tablist">
          <button
            role="tab"
            aria-selected={params.view === "scale"}
            onClick={() => setParams({ view: "scale" })}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              params.view === "scale"
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            Scale
          </button>
          <button
            role="tab"
            aria-selected={params.view === "specimen"}
            onClick={() => setParams({ view: "specimen" })}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              params.view === "specimen"
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            Specimen
          </button>
        </div>

        <FontPicker
          value={params.font}
          onChange={(font) => setParams({ font })}
        />
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-7">
          {params.view === "scale" ? (
            <ScaleView
              entries={entries}
              baseParam={params.base}
              font={params.font}
            />
          ) : (
            <SpecimenView entries={entries} font={params.font} />
          )}
        </div>

        <div id="export-panel">
          <ExportPanel />
        </div>
      </div>
    </div>
  )
}
