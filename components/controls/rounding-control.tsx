"use client"

interface RoundingControlProps {
  value: number
  onChange: (value: number) => void
}

const ROUNDING_OPTIONS = [
  { value: 1, label: "1px", description: "0.0625rem" },
  { value: 2, label: "2px", description: "0.125rem" },
  { value: 0, label: "None", description: "" },
]

export function RoundingControl({ value, onChange }: RoundingControlProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {ROUNDING_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-md border text-xs transition-colors ${
            value === opt.value
              ? "border-zinc-900 text-zinc-900 bg-zinc-900/5 shadow-sm"
              : "border-zinc-200 text-zinc-400 bg-white hover:border-zinc-300 hover:text-zinc-500"
          }`}
        >
          {opt.label}
          {opt.description && (
            <span className="ml-1 text-zinc-400 hidden sm:inline">
              ({opt.description})
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
