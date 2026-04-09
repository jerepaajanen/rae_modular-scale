"use client"

import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { parseBaseParam } from "@/lib/search-params"

interface BaseSizeControlProps {
  value: string
  onChange: (value: string) => void
}

export function BaseSizeControl({ value, onChange }: BaseSizeControlProps) {
  const bases = parseBaseParam(value)
  const baseA = bases[0] ?? 16
  const baseB = bases[1]
  const hasDualBase = bases.length > 1

  function updateBaseA(val: string) {
    const num = parseFloat(val)
    if (isNaN(num) || num <= 0) return
    const clamped = Math.min(999, Math.max(1, num))
    if (hasDualBase && baseB) {
      onChange(`${clamped},${baseB}`)
    } else {
      onChange(`${clamped}`)
    }
  }

  function updateBaseB(val: string) {
    const num = parseFloat(val)
    if (isNaN(num) || num <= 0) return
    const clamped = Math.min(999, Math.max(1, num))
    onChange(`${baseA},${clamped}`)
  }

  function toggleDualBase(checked: boolean) {
    if (checked) {
      onChange(`${baseA},${Math.round(baseA * 1.5)}`)
    } else {
      onChange(`${baseA}`)
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        <Input
          type="number"
          min={1}
          max={999}
          value={baseA}
          onChange={(e) => updateBaseA(e.target.value)}
          className="font-mono text-sm"
        />
        <span className="text-xs text-zinc-400 shrink-0">px</span>
      </div>

      <div className="flex items-center justify-between py-1">
        <Label htmlFor="dual-base" className="text-[13px] text-zinc-500">
          Second base
        </Label>
        <Switch
          id="dual-base"
          checked={hasDualBase}
          onCheckedChange={toggleDualBase}
        />
      </div>

      {hasDualBase && (
        <div className="flex items-center gap-2.5">
          <Input
            type="number"
            min={1}
            max={999}
            value={baseB ?? 24}
            onChange={(e) => updateBaseB(e.target.value)}
            className="font-mono text-sm"
          />
          <span className="text-xs text-zinc-400 shrink-0">px</span>
        </div>
      )}
    </div>
  )
}
