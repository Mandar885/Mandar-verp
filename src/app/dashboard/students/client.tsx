"use client"

import { DataTableView } from "@/components/data-table-view"
import {
  studentsColumns,
  type StudentRow,
} from "@/components/columns/students-columns"

export function StudentsClient({ data }: { data: StudentRow[] }) {
  return (
    <DataTableView
      columns={studentsColumns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search by name..."
    />
  )
}
