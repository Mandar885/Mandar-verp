import { pgTable, text, timestamp, boolean, uuid, integer, index } from "drizzle-orm/pg-core"
import { departments } from "./departments"
import { faculty } from "./faculty"

export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  courseName: text("course_name").notNull(),
  courseCode: text("course_code").notNull().unique(),
  departmentId: integer("department_id")
    .references(() => departments.id, { onDelete: "restrict" }),
  facultyId: uuid("faculty_id")
    .references(() => faculty.id, { onDelete: "set null" }),
  credits: integer("credits"),
  semester: text("semester"),
  year: text("year"),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("courses_department_id_idx").on(table.departmentId),
  index("courses_faculty_id_idx").on(table.facultyId),
  index("courses_is_active_idx").on(table.isActive),
])
