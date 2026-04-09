import { Suspense } from "react"
import { TopBar } from "@/components/top-bar"
import { Sidebar } from "@/components/sidebar"
import { PreviewArea } from "@/components/preview-area"
import { ExportPanel } from "@/components/export/export-panel"

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <Suspense>
        <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
          <Sidebar />
          <PreviewArea />
        </div>
        <ExportPanel />
      </Suspense>
    </div>
  )
}
