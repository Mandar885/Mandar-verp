"use client"

import { DataTableView } from "@/components/data-table-view"
import {
  attendanceColumns,
  type AttendanceRow,
} from "@/components/columns/attendance-columns"

export function AttendanceClient({ data }: { data: AttendanceRow[] }) {
  return (
    <DataTableView
      columns={attendanceColumns}
      data={data}
      searchKey="student"
      searchPlaceholder="Search by student..."
    />
  )
}
