"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { computeMarks, computeSgpi, type MarksInput, type CourseInfo } from "@/lib/sgpi"
import { DownloadIcon, FileSpreadsheetIcon, SearchIcon, ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon } from "lucide-react"
import { exportSgpiXlsx } from "@/lib/xlsx-export"

type CourseMarks = {
  courseCode: string
  courseName: string
  courseType: string
  credits: number
  maxIsa: number
  maxMse: number
  maxEse: number
  maxTotal: number
  isa: number | null
  mse1: number | null
  mse2: number | null
  ese: number | null
}

type SemesterData = {
  semesterNumber: number
  academicYear: string
  courses: CourseMarks[]
}

type StudentCgpaData = {
  studentId: string
  rollNumber: string
  firstName: string
  lastName: string
  division: string | null
  semesters: SemesterData[]
}

type SortField = "rollNumber" | "name" | "cgpa" | "credits" | "semesters"
type SortDir = "asc" | "desc"

function computeStudentCgpa(semesters: SemesterData[]) {
  let totalCredits = 0
  let totalCreditPoints = 0
  let hasFail = false
  let semCount = 0

  const perSemester: { semesterNumber: number; academicYear: string; sgpi: ReturnType<typeof computeSgpi> }[] = []

  for (const sem of semesters) {
    const entries = sem.courses.map((c) => ({
      marks: { isa: c.isa, mse1: c.mse1, mse2: c.mse2, ese: c.ese } as MarksInput,
      course: {
        courseType: c.courseType, credits: c.credits,
        maxIsa: c.maxIsa, maxMse: c.maxMse, maxEse: c.maxEse, maxTotal: c.maxTotal,
      } as CourseInfo,
    }))
    const sgpi = computeSgpi(entries)
    perSemester.push({ semesterNumber: sem.semesterNumber, academicYear: sem.academicYear, sgpi })

    totalCredits += sgpi.totalCredits
    totalCreditPoints += sgpi.totalCreditPoints
    if (sgpi.hasFail) hasFail = true
    if (sgpi.sgpi != null) semCount++
  }

  const cgpa = totalCredits > 0
    ? Math.round((totalCreditPoints / totalCredits) * 100) / 100
    : null

  return { totalCredits, totalCreditPoints, cgpa, hasFail, semCount, perSemester }
}

export function CgpaClient({
  students,
  divisions,
}: {
  students: StudentCgpaData[]
  divisions: string[]
}) {
  const [search, setSearch] = useState("")
  const [divFilter, setDivFilter] = useState("all")
  const [sortField, setSortField] = useState<SortField>("rollNumber")
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir(field === "cgpa" ? "desc" : "asc")
    }
  }

  // Precompute CGPA for all students
  const studentsWithCgpa = useMemo(() =>
    students.map((s) => ({
      ...s,
      computed: computeStudentCgpa(s.semesters),
    })),
    [students]
  )

  const filtered = useMemo(() => {
    let result = studentsWithCgpa

    // Division filter
    if (divFilter !== "all") {
      result = result.filter((s) => s.division === divFilter)
    }

    // Search
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((s) =>
        s.rollNumber.toLowerCase().includes(q) ||
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(q)
      )
    }

    // Sort
    result = [...result].sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case "rollNumber":
          cmp = a.rollNumber.localeCompare(b.rollNumber)
          break
        case "name":
          cmp = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
          break
        case "cgpa":
          cmp = (a.computed.cgpa ?? -1) - (b.computed.cgpa ?? -1)
          break
        case "credits":
          cmp = a.computed.totalCredits - b.computed.totalCredits
          break
        case "semesters":
          cmp = a.computed.semCount - b.computed.semCount
          break
      }
      return sortDir === "desc" ? -cmp : cmp
    })

    return result
  }, [studentsWithCgpa, search, divFilter, sortField, sortDir])

  function handleExportCsv() {
    const headers = ["Roll No.", "Name", "Division", "Semesters", "Credits", "CGP", "CGPA", "Status"]
    const csvRows = filtered.map((s) => [
      s.rollNumber,
      `${s.firstName} ${s.lastName}`,
      s.division ?? "",
      s.computed.semCount,
      s.computed.totalCredits,
      s.computed.totalCreditPoints,
      s.computed.cgpa ?? "",
      s.computed.hasFail ? "Fail" : s.computed.cgpa != null ? "Pass" : "",
    ])
    const csv = [headers, ...csvRows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cgpa-report.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  // Stats
  const withCgpa = filtered.filter((s) => s.computed.cgpa != null)
  const avgCgpa = withCgpa.length > 0
    ? Math.round((withCgpa.reduce((sum, s) => sum + (s.computed.cgpa ?? 0), 0) / withCgpa.length) * 100) / 100
    : null

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="tabular-nums text-xs">{filtered.length} students</Badge>
          {avgCgpa != null && (
            <Badge variant="outline" className="text-blue tabular-nums text-xs">
              Avg CGPA: {avgCgpa}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            <DownloadIcon className="size-3.5 mr-1.5" /> CSV
          </Button>
        </div>
      </div>

      {/* Search + Division Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative max-w-sm flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        {divisions.length > 0 && (
          <div className="flex gap-1">
            <button
              onClick={() => setDivFilter("all")}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                divFilter === "all"
                  ? "bg-blue text-blue-foreground shadow-sm"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              All Divisions
            </button>
            {divisions.map((d) => (
              <button
                key={d}
                onClick={() => setDivFilter(d)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  divFilter === d
                    ? "bg-blue text-blue-foreground shadow-sm"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                Div {d}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <SortableHead field="rollNumber" current={sortField} dir={sortDir} onSort={handleSort}>
                Roll No.
              </SortableHead>
              <SortableHead field="name" current={sortField} dir={sortDir} onSort={handleSort}>
                Name
              </SortableHead>
              <TableHead className="w-[60px] text-center">Div</TableHead>
              <SortableHead field="semesters" current={sortField} dir={sortDir} onSort={handleSort} className="w-[80px] text-center">
                Sems
              </SortableHead>
              <SortableHead field="credits" current={sortField} dir={sortDir} onSort={handleSort} className="w-[80px] text-center">
                Credits
              </SortableHead>
              <TableHead className="w-[80px] text-center">CGP</TableHead>
              <SortableHead field="cgpa" current={sortField} dir={sortDir} onSort={handleSort} className="w-[80px] text-center">
                CGPA
              </SortableHead>
              <TableHead className="w-[80px] text-center">Status</TableHead>
              <TableHead className="w-[80px] text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">No results.</TableCell>
              </TableRow>
            ) : (
              filtered.map((student, idx) => (
                <TableRow key={student.studentId}>
                  <TableCell className="text-muted-foreground tabular-nums">{idx + 1}</TableCell>
                  <TableCell className="font-mono text-xs">{student.rollNumber}</TableCell>
                  <TableCell className="font-medium text-sm">{student.firstName} {student.lastName}</TableCell>
                  <TableCell className="text-center">
                    {student.division ? <Badge variant="secondary" className="text-xs">{student.division}</Badge> : <span className="text-muted-foreground">-</span>}
                  </TableCell>
                  <TableCell className="text-center tabular-nums">{student.computed.semCount || "-"}</TableCell>
                  <TableCell className="text-center tabular-nums">{student.computed.totalCredits || "-"}</TableCell>
                  <TableCell className="text-center tabular-nums">{student.computed.totalCreditPoints || "-"}</TableCell>
                  <TableCell className="text-center font-semibold tabular-nums">
                    {student.computed.cgpa ?? "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {student.computed.hasFail
                      ? <Badge variant="outline" className="text-destructive border-red-200 bg-red-50 text-xs">Fail</Badge>
                      : student.computed.cgpa != null
                        ? <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 text-xs">Pass</Badge>
                        : <span className="text-muted-foreground">-</span>
                    }
                  </TableCell>
                  <TableCell className="text-center">
                    <StudentDetailDialog student={student} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function SortableHead({
  field,
  current,
  dir,
  onSort,
  children,
  className = "",
}: {
  field: SortField
  current: SortField
  dir: SortDir
  onSort: (f: SortField) => void
  children: React.ReactNode
  className?: string
}) {
  const isActive = current === field
  return (
    <TableHead className={className}>
      <button
        onClick={() => onSort(field)}
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
      >
        {children}
        {isActive ? (
          dir === "asc" ? <ArrowUpIcon className="size-3" /> : <ArrowDownIcon className="size-3" />
        ) : (
          <ArrowUpDownIcon className="size-3 opacity-30" />
        )}
      </button>
    </TableHead>
  )
}

function StudentDetailDialog({ student }: { student: StudentCgpaData & { computed: ReturnType<typeof computeStudentCgpa> } }) {
  if (student.semesters.length === 0) {
    return (
      <Dialog>
        <DialogTrigger render={<button className="text-xs font-medium text-blue underline-offset-2 hover:underline" />}>
          View
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {student.firstName} {student.lastName}
              <Badge variant="outline" className="font-mono text-xs font-normal">{student.rollNumber}</Badge>
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-4 text-center">No marks recorded for this student.</p>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog>
      <DialogTrigger render={<button className="text-xs font-medium text-blue underline-offset-2 hover:underline" />}>
        View
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {student.firstName} {student.lastName}
            <Badge variant="outline" className="font-mono text-xs font-normal">{student.rollNumber}</Badge>
            {student.division && <Badge variant="secondary" className="text-xs">Div {student.division}</Badge>}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {student.computed.perSemester.map((sem) => (
            <div key={sem.semesterNumber} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  Semester {sem.semesterNumber}
                  <span className="ml-1.5 text-xs font-normal text-muted-foreground">({sem.academicYear})</span>
                </h3>
                <div className="flex items-center gap-2 text-xs">
                  {sem.sgpi.hasFail && <Badge variant="outline" className="text-destructive border-red-200 bg-red-50 text-[10px]">Fail</Badge>}
                  <span className="text-muted-foreground">SGPI:</span>
                  <span className="font-bold tabular-nums">{sem.sgpi.sgpi ?? "-"}</span>
                </div>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Code</TableHead>
                      <TableHead className="text-xs">Course</TableHead>
                      <TableHead className="text-xs text-center">Cr</TableHead>
                      <TableHead className="text-xs text-center">ISA</TableHead>
                      <TableHead className="text-xs text-center">MSE</TableHead>
                      <TableHead className="text-xs text-center">ESE</TableHead>
                      <TableHead className="text-xs text-center">Total</TableHead>
                      <TableHead className="text-xs text-center">%</TableHead>
                      <TableHead className="text-xs text-center">GP</TableHead>
                      <TableHead className="text-xs text-center">C*GP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.semesters
                      .find((s) => s.semesterNumber === sem.semesterNumber)
                      ?.courses.map((m) => {
                        const courseInfo: CourseInfo = {
                          courseType: m.courseType, credits: m.credits,
                          maxIsa: m.maxIsa, maxMse: m.maxMse, maxEse: m.maxEse, maxTotal: m.maxTotal,
                        }
                        const computed = computeMarks(
                          { isa: m.isa, mse1: m.mse1, mse2: m.mse2, ese: m.ese },
                          courseInfo,
                        )
                        return (
                          <TableRow key={m.courseCode}>
                            <TableCell className="font-mono text-xs">{m.courseCode}</TableCell>
                            <TableCell className="text-xs">{m.courseName}</TableCell>
                            <TableCell className="text-center tabular-nums text-xs">{m.credits}</TableCell>
                            <TableCell className="text-center tabular-nums text-xs">{m.isa ?? "-"}</TableCell>
                            <TableCell className="text-center tabular-nums text-xs">{computed.finalMse ?? "-"}</TableCell>
                            <TableCell className="text-center tabular-nums text-xs">{m.ese ?? "-"}</TableCell>
                            <TableCell className="text-center tabular-nums text-xs font-semibold">{computed.percentage != null ? computed.total : "-"}</TableCell>
                            <TableCell className="text-center tabular-nums text-xs">{computed.percentage ?? "-"}</TableCell>
                            <TableCell className="text-center tabular-nums text-xs">
                              {computed.gradePoint === "Fail"
                                ? <span className="font-medium text-destructive">F</span>
                                : computed.gradePoint ?? "-"
                              }
                            </TableCell>
                            <TableCell className="text-center tabular-nums text-xs">{computed.creditPoints ?? "-"}</TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}

          {/* CGPA Summary */}
          <div className="flex items-center justify-end gap-6 rounded-lg border bg-muted/50 p-3 text-sm">
            <div>
              <span className="text-muted-foreground text-xs">Semesters: </span>
              <span className="font-semibold tabular-nums">{student.computed.semCount}</span>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Total Credits: </span>
              <span className="font-semibold tabular-nums">{student.computed.totalCredits}</span>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Total CGP: </span>
              <span className="font-semibold tabular-nums">{student.computed.totalCreditPoints}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-xs">CGPA:</span>
              <span className="text-xl font-bold tabular-nums text-blue">{student.computed.cgpa ?? "-"}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
