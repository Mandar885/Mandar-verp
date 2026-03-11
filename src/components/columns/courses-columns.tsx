"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

export type CourseRow = {
  id: string
  courseName: string
  courseCode: string
  credits: number | null
  semester: string | null
  year: string | null
  isActive: boolean
  department: { name: string; code: string } | null
  faculty: { firstName: string; lastName: string } | null
}

export const coursesColumns: ColumnDef<CourseRow>[] = [
  {
    accessorKey: "courseCode",
    header: "Code",
  },
  {
    accessorKey: "courseName",
    header: "Course Name",
  },
  {
    id: "department",
    header: "Department",
    accessorFn: (row) => row.department?.code ?? "-",
    cell: ({ row }) => {
      const dept = row.original.department
      return dept ? <Badge variant="outline">{dept.code}</Badge> : "-"
    },
  },
  {
    id: "faculty",
    header: "Faculty",
    accessorFn: (row) => row.faculty ? `${row.faculty.firstName} ${row.faculty.lastName}` : "-",
  },
  {
    accessorKey: "credits",
    header: "Credits",
    cell: ({ row }) => row.getValue("credits") ?? "-",
  },
  {
    accessorKey: "semester",
    header: "Semester",
    cell: ({ row }) => row.getValue("semester") ?? "-",
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => row.getValue("year") ?? "-",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isActive") ? "default" : "secondary"}>
        {row.getValue("isActive") ? "Active" : "Inactive"}
      </Badge>
    ),
  },
]
