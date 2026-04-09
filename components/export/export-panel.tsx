"use client"

import { useState } from "react"
import { Copy, Check, ChevronUp } from "lucide-react"
import { useScaleConfig } from "@/hooks/use-scale-config"
import { formatCSS, formatSCSS, formatTailwind, formatJSON } from "@/lib/export"
import { CodeBlock } from "@/components/export/code-block"

const formats = ["CSS", "SCSS", "Tailwind", "JSON"] as const
type Format = (typeof formats)[number]

const languageMap: Record<Format, "css" | "scss" | "javascript" | "json"> = {
  CSS: "css",
  SCSS: "scss",
  Tailwind: "javascript",
  JSON: "json",
}

export function ExportPanel() {
  const { params, config, entries } = useScaleConfig()
  const [activeFormat, setActiveFormat] = useState<Format>("CSS")
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  function getFormattedCode(): string {
    switch (activeFormat) {
      case "CSS":
        return formatCSS(entries, params.prefix, config)
      case "SCSS":
        return formatSCSS(entries, params.prefix, config)
      case "Tailwind":
        return formatTailwind(entries, params.prefix, config)
      case "JSON":
        return formatJSON(entries, params.prefix, config)
    }
  }

  const code = getFormattedCode()

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }).catch(() => {
      const textarea = document.createElement("textarea")
      textarea.value = code
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/10 z-40 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        id="export-panel"
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-200 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] transition-transform duration-200 ease-out"
        style={{ transform: open ? "translateY(0)" : "translateY(calc(100% - var(--drawer-height)))" }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-7 py-2.5 hover:bg-zinc-50/80 transition-colors"
          style={{ height: "var(--drawer-height)" }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
            Code Output
          </span>

          <div className="flex items-center gap-3">
            <div className="flex gap-1" role="tablist">
              {formats.map((format) => {
                const isActive = activeFormat === format
                return (
                  <span
                    key={format}
                    role="tab"
                    aria-selected={isActive}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveFormat(format)
                      if (!open) setOpen(true)
                    }}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                      isActive
                        ? "bg-zinc-100 text-zinc-900"
                        : "text-zinc-400 hover:text-zinc-600"
                    }`}
                  >
                    {format}
                  </span>
                )
              })}
            </div>

            <ChevronUp
              className={`size-4 text-zinc-400 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        <div className="relative px-7 pb-5 pt-1" style={{ maxHeight: "50vh", overflowY: "auto" }}>
          <button
            onClick={handleCopy}
            className="absolute right-9 top-3 z-10 flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-400 transition-colors hover:text-zinc-700 hover:border-zinc-300"
          >
            {copied ? (
              <>
                <Check className="size-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="size-3" />
                Copy
              </>
            )}
          </button>

          <CodeBlock code={code} language={languageMap[activeFormat]} />
        </div>
      </div>
    </>
  )
}
