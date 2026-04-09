"use client"

import { Separator } from "@/components/ui/separator"
import { useScaleConfig } from "@/hooks/use-scale-config"
import { BaseSizeControl } from "@/components/controls/base-size-control"
import { RatioControl } from "@/components/controls/ratio-control"
import { StepsControl } from "@/components/controls/steps-control"
import { RoundingControl } from "@/components/controls/rounding-control"
import { PrefixControl } from "@/components/controls/prefix-control"

function ControlGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
        {label}
      </span>
      {children}
    </div>
  )
}

export function Sidebar() {
  const { params, setParams } = useScaleConfig()

  return (
    <aside className="w-full lg:w-85 shrink-0 bg-zinc-50 border-b lg:border-b-0 lg:border-r border-zinc-100 p-6 lg:p-8 flex flex-col gap-7 overflow-y-auto">
      <ControlGroup label="Base Size">
        <BaseSizeControl
          value={params.base}
          onChange={(base) => setParams({ base })}
        />
      </ControlGroup>

      <Separator className="bg-zinc-100" />

      <ControlGroup label="Ratio">
        <RatioControl
          value={params.ratio}
          onChange={(ratio) => setParams({ ratio })}
        />
      </ControlGroup>

      <Separator className="bg-zinc-100" />

      <ControlGroup label="Steps">
        <StepsControl
          neg={params.neg}
          pos={params.pos}
          onNegChange={(neg) => setParams({ neg })}
          onPosChange={(pos) => setParams({ pos })}
        />
      </ControlGroup>

      <Separator className="bg-zinc-100" />

      <ControlGroup label="Rounding">
        <RoundingControl
          value={params.round}
          onChange={(round) => setParams({ round })}
        />
      </ControlGroup>

      <Separator className="bg-zinc-100" />

      <ControlGroup label="Export Prefix">
        <PrefixControl
          value={params.prefix}
          onChange={(prefix) => setParams({ prefix })}
        />
      </ControlGroup>
    </aside>
  )
}
