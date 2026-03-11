import { eq, and } from "drizzle-orm"
import { db } from "@/db"
import { courses } from "@/db/schema"

export async function getCourseById(id: string) {
  return db.query.courses.findFirst({
    where: and(eq(courses.id, id), eq(courses.isActive, true)),
    with: { department: true, faculty: true },
  })
}

export async function getAllCourses(filters?: {
  departmentId?: number
  year?: string
  semester?: string
}) {
  return db.query.courses.findMany({
    where: and(
      eq(courses.isActive, true),
      filters?.departmentId ? eq(courses.departmentId, filters.departmentId) : undefined,
      filters?.year ? eq(courses.year, filters.year) : undefined,
      filters?.semester ? eq(courses.semester, filters.semester) : undefined,
    ),
    with: { department: true, faculty: true },
    orderBy: (courses, { asc }) => [asc(courses.courseCode)],
  })
}

export async function createCourse(data: typeof courses.$inferInsert) {
  const [result] = await db.insert(courses).values(data).returning()
  return result
}

export async function updateCourse(id: string, data: Partial<typeof courses.$inferInsert>) {
  const [result] = await db
    .update(courses)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(courses.id, id))
    .returning()
  return result
}

export async function deactivateCourse(id: string) {
  return updateCourse(id, { isActive: false })
}
