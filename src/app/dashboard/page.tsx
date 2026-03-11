import { SiteHeader } from "@/components/site-header"
import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"

export default function DashboardPage() {
  return (
    <>
      <SiteHeader />
      <div className="@container/main flex flex-1 flex-col">
        <div className="flex flex-col gap-8 py-8">
          <SectionCards />
          <div className="px-6 lg:px-10">
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </>
  )
}
