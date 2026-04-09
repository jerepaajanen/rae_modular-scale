"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { FONT_LIST, loadGoogleFont } from "@/lib/fonts"
import { ChevronDown } from "lucide-react"

interface FontPickerProps {
  value: string
  onChange: (font: string) => void
}

export function FontPicker({ value, onChange }: FontPickerProps) {
  const [open, setOpen] = useState(false)

  function handleOpenChange(isOpen: boolean) {
    if (isOpen) {
      FONT_LIST.slice(0, 10).forEach(loadGoogleFont)
    }
    setOpen(isOpen)
  }

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xs text-zinc-400">Preview font</span>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-[13px] text-zinc-600 hover:border-zinc-300 transition-colors">
          {value}
          <ChevronDown className="h-3 w-3 text-zinc-400" />
        </PopoverTrigger>
        <PopoverContent className="w-60 p-0" align="end">
          <Command>
            <CommandInput placeholder="Search fonts..." />
            <CommandList>
              <CommandEmpty>No font found.</CommandEmpty>
              <CommandGroup>
                {FONT_LIST.map((font) => (
                  <CommandItem
                    key={font}
                    value={font}
                    data-checked={font === value || undefined}
                    onSelect={() => {
                      loadGoogleFont(font)
                      onChange(font)
                      setOpen(false)
                    }}
                  >
                    <span style={{ fontFamily: font }}>{font}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
