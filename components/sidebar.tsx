"use client"

import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useScaleConfig } from "@/hooks/use-scale-config"
import { BaseSizeControl } from "@/components/controls/base-size-control"
import { RatioControl } from "@/components/controls/ratio-control"
import { StepsControl } from "@/components/controls/steps-control"
import { RoundingControl } from "@/components/controls/rounding-control"
import { PrefixControl } from "@/components/controls/prefix-control"
import { Info } from "lucide-react"

function ControlGroup({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
          {label}
        </span>
        {hint && (
          <Tooltip>
            <TooltipTrigger className="cursor-help">
              <Info className="size-3 text-zinc-300 hover:text-zinc-500 transition-colors" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-48 text-[11px] leading-relaxed">
              {hint}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  )
}

export function Sidebar() {
  const { params, setParams } = useScaleConfig()

  function handleReset() {
    setParams({
      base: "16",
      ratio: 1.333,
      neg: 2,
      pos: 10,
      round: 1,
      prefix: "step",
      font: "Inter",
      view: "scale",
    })
  }

  return (
    <aside className="w-full lg:w-85 shrink-0 bg-zinc-50 border-b lg:border-b-0 lg:border-r border-zinc-100 p-6 lg:p-8 flex flex-col gap-7 overflow-y-auto scrollbar-none" style={{ paddingBottom: "calc(var(--drawer-height) + .5rem)" }}>
      <ControlGroup
        label="Base Size"
        hint="The foundation of your scale. Add a second base to create a richer set of sizes."
      >
        <BaseSizeControl
          value={params.base}
          onChange={(base) => setParams({ base })}
        />
      </ControlGroup>

      <Separator className="bg-zinc-100" />

      <ControlGroup
        label="Ratio"
        hint="Each step multiplies by this number. Higher ratios create more dramatic contrast between sizes."
      >
        <RatioControl
          value={params.ratio}
          onChange={(ratio) => setParams({ ratio })}
        />
      </ControlGroup>

      <Separator className="bg-zinc-100" />

      <ControlGroup
        label="Steps"
        hint="How many sizes above and below the base. Negative steps create smaller sizes."
      >
        <StepsControl
          neg={params.neg}
          pos={params.pos}
          onNegChange={(neg) => setParams({ neg })}
          onPosChange={(pos) => setParams({ pos })}
        />
      </ControlGroup>

      <Separator className="bg-zinc-100" />

      <ControlGroup
        label="Rounding"
        hint="Snap values to whole pixels for crisp rendering. 1px is the tightest grid."
      >
        <RoundingControl
          value={params.round}
          onChange={(round) => setParams({ round })}
        />
      </ControlGroup>

      <Separator className="bg-zinc-100" />

      <ControlGroup
        label="Export Prefix"
        hint="The variable name used in exported code, e.g. --step-0, $step-0."
      >
        <PrefixControl
          value={params.prefix}
          onChange={(prefix) => setParams({ prefix })}
        />
      </ControlGroup>

      <Separator className="bg-zinc-100" />

      <button
        onClick={handleReset}
        className="text-[11px] text-zinc-400 hover:text-zinc-600 transition-colors self-start tracking-wide"
      >
        Reset to defaults
      </button>

      {/* Spacer pushes credit to bottom */}
      <div className="flex-1" />

      {/* RAE credit */}
      <a
        href="https://rae.fi"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-[10px] text-zinc-300 hover:text-zinc-400 transition-colors self-start"
      >
        Built by <img src="/assets/logo.svg" alt="RAE" className="h-3.5 w-auto" />
      </a>
    </aside>
  )
}
