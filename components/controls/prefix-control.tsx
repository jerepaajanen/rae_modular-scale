"use client"

import { Input } from "@/components/ui/input"

interface PrefixControlProps {
  value: string
  onChange: (value: string) => void
}

export function PrefixControl({ value, onChange }: PrefixControlProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-400 font-mono shrink-0">--</span>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="step"
        className="font-mono text-[13px]"
      />
      <span className="text-xs text-zinc-400 font-mono shrink-0">-</span>
    </div>
  )
}
