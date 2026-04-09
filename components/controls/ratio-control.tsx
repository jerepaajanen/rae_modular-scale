"use client"

import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { RATIO_PRESETS, RATIO_MIN, RATIO_MAX } from "@/lib/ratios"
import { ChevronDown } from "lucide-react"

interface RatioControlProps {
  value: number
  onChange: (value: number) => void
}

function getPresetName(value: number): string | null {
  const preset = RATIO_PRESETS.find(
    (p) => Math.abs(p.value - value) < 0.001
  )
  return preset?.name ?? null
}

export function RatioControl({ value, onChange }: RatioControlProps) {
  const [open, setOpen] = useState(false)
  const [customInput, setCustomInput] = useState("")
  const presetName = getPresetName(value)
  const displayText = presetName
    ? `${presetName} — ${value}`
    : `Custom — ${value}`

  function handleCustomSubmit() {
    const num = parseFloat(customInput)
    if (isNaN(num)) return
    const clamped = Math.min(RATIO_MAX, Math.max(RATIO_MIN, num))
    onChange(clamped)
    setCustomInput("")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full flex items-center justify-between h-10 rounded-lg border border-zinc-200 bg-white px-3.5 text-sm text-zinc-900 hover:border-zinc-300 transition-colors">
        <span>{displayText}</span>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
      </PopoverTrigger>
      <PopoverContent className="w-70 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search ratios..." />
          <CommandList>
            <CommandEmpty>No ratio found.</CommandEmpty>
            <CommandGroup>
              {RATIO_PRESETS.map((preset) => (
                <CommandItem
                  key={preset.name}
                  value={preset.name}
                  data-checked={Math.abs(preset.value - value) < 0.001 || undefined}
                  onSelect={() => {
                    onChange(preset.value)
                    setOpen(false)
                  }}
                >
                  <span className="flex-1">
                    {preset.name}{" "}
                    <span className="text-zinc-400 font-mono text-xs">
                      {preset.value}
                    </span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="border-t border-zinc-100 p-2">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleCustomSubmit()
              }}
              className="flex gap-2"
            >
              <Input
                type="number"
                step="0.001"
                min={RATIO_MIN}
                max={RATIO_MAX}
                placeholder="Custom ratio"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="text-sm font-mono h-8"
              />
              <button
                type="submit"
                className="shrink-0 h-8 px-3 rounded-md bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
              >
                Set
              </button>
            </form>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
