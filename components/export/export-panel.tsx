"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
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
      // Fallback for insecure contexts
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
    <div className="border-t border-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between bg-zinc-50 px-7 py-3">
        <span className="text-sm font-medium text-zinc-700">Code Output</span>

        {/* Format tab buttons */}
        <div className="flex">
          {formats.map((format, i) => {
            const isFirst = i === 0
            const isLast = i === formats.length - 1
            const isActive = activeFormat === format

            return (
              <button
                key={format}
                onClick={() => setActiveFormat(format)}
                className={`border border-zinc-200 px-3 py-1 text-xs transition-colors ${
                  isFirst ? "rounded-l-md" : ""
                } ${isLast ? "rounded-r-md" : ""} ${
                  !isFirst ? "-ml-px" : ""
                } ${
                  isActive
                    ? "bg-zinc-100 font-medium text-zinc-900"
                    : "bg-white text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {format}
              </button>
            )
          })}
        </div>
      </div>

      {/* Code block with copy button */}
      <div className="relative px-7 pb-5 pt-3">
        <button
          onClick={handleCopy}
          className="absolute right-9 top-5 z-10 flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-500 transition-colors hover:text-zinc-700"
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
  )
}
