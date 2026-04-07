import { PageHeader } from "@/components/page-header"
import { FacultyClient } from "./client"
import { getAllFaculty } from "@/db/queries"

export const dynamic = "force-dynamic"

export default async function FacultyPage() {
  const data = await getAllFaculty()

  return (
    <>
      <PageHeader
        title="All Faculty"
        parent="Faculty"
        parentHref="/dashboard/faculty"
      />
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <FacultyClient data={data} />
      </div>
    </>
  )
}
