import { PageHeader } from "@/components/page-header"
import { StudentsClient } from "./client"
import { getAllStudents } from "@/db/queries"

export const dynamic = "force-dynamic"

export default async function StudentsPage() {
  const data = await getAllStudents()

  return (
    <>
      <PageHeader
        title="All Students"
        parent="Students"
        parentHref="/dashboard/students"
      />
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <StudentsClient data={data} />
      </div>
    </>
  )
}
