"use client"

import { Input } from "@/components/ui/input"

interface StepsControlProps {
  neg: number
  pos: number
  onNegChange: (value: number) => void
  onPosChange: (value: number) => void
}

export function StepsControl({
  neg,
  pos,
  onNegChange,
  onPosChange,
}: StepsControlProps) {
  function handleNeg(val: string) {
    const num = parseInt(val, 10)
    if (isNaN(num)) return
    onNegChange(Math.min(10, Math.max(0, num)))
  }

  function handlePos(val: string) {
    const num = parseInt(val, 10)
    if (isNaN(num)) return
    onPosChange(Math.min(20, Math.max(1, num)))
  }

  return (
    <div className="flex items-center gap-2.5">
      <Input
        type="number"
        min={0}
        max={10}
        value={neg}
        onChange={(e) => handleNeg(e.target.value)}
        className="w-[72px] text-center font-mono text-sm"
      />
      <span className="text-xs text-zinc-400">negative</span>
      <Input
        type="number"
        min={1}
        max={20}
        value={pos}
        onChange={(e) => handlePos(e.target.value)}
        className="w-[72px] text-center font-mono text-sm"
      />
      <span className="text-xs text-zinc-400">positive</span>
    </div>
  )
}
