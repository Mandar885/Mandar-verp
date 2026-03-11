import { sql } from "drizzle-orm"
import { db } from "@/db"

export async function getDashboardStats() {
  const result = await db.execute(sql`
    SELECT
      (SELECT count(*)::int FROM students WHERE is_active = true) as total_students,
      (SELECT count(*)::int FROM faculty WHERE is_active = true) as total_faculty,
      (SELECT count(*)::int FROM courses WHERE is_active = true) as total_courses,
      (SELECT count(*)::int FROM departments WHERE is_active = true) as total_departments
  `)
  return result.rows[0] as {
    total_students: number
    total_faculty: number
    total_courses: number
    total_departments: number
  }
}

export async function getAttendanceOverview() {
  const result = await db.execute(sql`
    SELECT
      count(*) FILTER (WHERE status = 'present' OR status = 'late')::int as present_count,
      count(*) FILTER (WHERE status = 'absent')::int as absent_count,
      count(*)::int as total_records,
      CASE WHEN count(*) > 0
        THEN round((count(*) FILTER (WHERE status = 'present' OR status = 'late')::numeric / count(*)::numeric) * 100, 1)
        ELSE 0
      END as attendance_rate
    FROM attendance
    WHERE is_active = true
      AND date >= now() - interval '30 days'
  `)
  return result.rows[0] as {
    present_count: number
    absent_count: number
    total_records: number
    attendance_rate: number
  }
}
