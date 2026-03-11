import { pgTable, text, timestamp, boolean, uuid, index, unique } from "drizzle-orm/pg-core"
import { students } from "./students"
import { courses } from "./courses"
import { faculty } from "./faculty"

export const attendance = pgTable("attendance", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  date: timestamp("date", { withTimezone: true }).notNull(),
  status: text("status").notNull().default("absent"),
  markedById: uuid("marked_by_id")
    .references(() => faculty.id, { onDelete: "set null" }),
  remarks: text("remarks"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  unique("attendance_student_course_date_uniq").on(table.studentId, table.courseId, table.date),
  index("attendance_student_id_idx").on(table.studentId),
  index("attendance_course_id_idx").on(table.courseId),
  index("attendance_date_idx").on(table.date),
  index("attendance_status_idx").on(table.status),
])
