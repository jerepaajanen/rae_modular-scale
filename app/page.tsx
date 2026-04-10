"use client"

import { Suspense, useState } from "react"
import { TopBar } from "@/components/top-bar"
import { Sidebar } from "@/components/sidebar"
import { PreviewArea } from "@/components/preview-area"
import { ExportPanel } from "@/components/export/export-panel"

function AppContent() {
  const [exportOpen, setExportOpen] = useState(false)

  return (
    <>
      <TopBar onExportToggle={() => setExportOpen((o) => !o)} />
      <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
        <Sidebar />
        <PreviewArea />
      </div>
      <ExportPanel open={exportOpen} onOpenChange={setExportOpen} />
    </>
  )
}

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Suspense>
        <AppContent />
      </Suspense>
    </div>
  )
}
