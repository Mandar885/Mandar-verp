"use client"

import { DataTableView } from "@/components/data-table-view"
import {
  coursesColumns,
  type CourseRow,
} from "@/components/columns/courses-columns"

export function CoursesClient({ data }: { data: CourseRow[] }) {
  return (
    <DataTableView
      columns={coursesColumns}
      data={data}
      searchKey="courseName"
      searchPlaceholder="Search courses..."
    />
  )
}
