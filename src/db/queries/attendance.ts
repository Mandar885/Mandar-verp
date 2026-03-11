import { eq, and, sql, between } from "drizzle-orm"
import { db } from "@/db"
import { attendance } from "@/db/schema"

export async function getAttendanceByStudent(studentId: string, filters?: {
  courseId?: string
  startDate?: Date
  endDate?: Date
}) {
  return db.query.attendance.findMany({
    where: and(
      eq(attendance.studentId, studentId),
      eq(attendance.isActive, true),
      filters?.courseId ? eq(attendance.courseId, filters.courseId) : undefined,
      filters?.startDate && filters?.endDate
        ? between(attendance.date, filters.startDate, filters.endDate)
        : undefined,
    ),
    with: { course: true },
    orderBy: (attendance, { desc }) => [desc(attendance.date)],
  })
}

export async function getAttendanceByCourse(courseId: string, date: Date) {
  return db.query.attendance.findMany({
    where: and(
      eq(attendance.courseId, courseId),
      eq(attendance.date, date),
      eq(attendance.isActive, true),
    ),
    with: { student: true },
  })
}

export async function markAttendance(data: typeof attendance.$inferInsert) {
  const [result] = await db
    .insert(attendance)
    .values(data)
    .onConflictDoUpdate({
      target: [attendance.studentId, attendance.courseId, attendance.date],
      set: { status: data.status, markedById: data.markedById, updatedAt: new Date() },
    })
    .returning()
  return result
}

export async function bulkMarkAttendance(records: (typeof attendance.$inferInsert)[]) {
  return db.transaction(async (tx) => {
    const results = []
    for (const record of records) {
      const [result] = await tx
        .insert(attendance)
        .values(record)
        .onConflictDoUpdate({
          target: [attendance.studentId, attendance.courseId, attendance.date],
          set: { status: record.status, markedById: record.markedById, updatedAt: new Date() },
        })
        .returning()
      results.push(result)
    }
    return results
  })
}

export async function getAttendanceRate(studentId: string, courseId?: string) {
  const result = await db.execute(sql`
    SELECT
      count(*) FILTER (WHERE status = 'present' OR status = 'late')::int as present,
      count(*)::int as total
    FROM attendance
    WHERE student_id = ${studentId}
      AND is_active = true
      ${courseId ? sql`AND course_id = ${courseId}` : sql``}
  `)
  const row = result.rows[0] as { present: number; total: number }
  if (!row || row.total === 0) return 0
  return Math.round((row.present / row.total) * 100 * 10) / 10
}
