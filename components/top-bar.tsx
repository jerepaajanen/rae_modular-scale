"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Link, Code } from "lucide-react"

export function TopBar() {
  const [copied, setCopied] = useState(false)

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = window.location.href
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [])

  const handleExport = useCallback(() => {
    const toggle = document.querySelector("#export-panel button")
    if (toggle instanceof HTMLElement) toggle.click()
  }, [])

  return (
    <header className="flex items-center justify-between px-7 py-4 border-b border-zinc-100 bg-white">
      <div className="flex items-baseline gap-2">
        <span className="text-[15px] font-bold tracking-tight text-zinc-900">
          RAE Scale
        </span>
        <span className="text-[13px] text-zinc-300 font-light">/</span>
        <span className="text-[13px] tracking-tight text-zinc-400">
          modular type scale
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Link data-icon="inline-start" />
          {copied ? "Copied!" : "Share"}
        </Button>
        <Button size="sm" onClick={handleExport}>
          <Code data-icon="inline-start" />
          Export
        </Button>
      </div>
    </header>
  )
}
