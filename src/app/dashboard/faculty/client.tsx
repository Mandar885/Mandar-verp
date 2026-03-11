"use client"

import { DataTableView } from "@/components/data-table-view"
import { facultyColumns, type FacultyRow } from "@/components/columns/faculty-columns"

export function FacultyClient({ data }: { data: FacultyRow[] }) {
  return (
    <DataTableView
      columns={facultyColumns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search by name..."
    />
  )
}
