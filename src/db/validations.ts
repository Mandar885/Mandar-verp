import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { students } from "./schema/students"
import { faculty } from "./schema/faculty"
import { departments } from "./schema/departments"
import { courses } from "./schema/courses"
import { attendance } from "./schema/attendance"

export const insertStudentSchema = createInsertSchema(students, {
  email: (schema) => schema.email("Invalid email format"),
  phoneNo: (schema) => schema.regex(/^\d{10}$/, "Phone must be 10 digits").optional(),
  department: () => z.string().min(1, "Department is required"),
  year: () => z.enum(["FE", "SE", "TE", "BE"]),
  gender: () => z.enum(["M", "F", "Other", "Prefer not to say"]).optional(),
})
export const updateStudentSchema = insertStudentSchema.partial()
export const selectStudentSchema = createSelectSchema(students)

export const insertFacultySchema = createInsertSchema(faculty, {
  email: (schema) => schema.email("Invalid email format"),
  phoneNo: (schema) => schema.regex(/^\d{10}$/, "Phone must be 10 digits").optional(),
  department: () => z.string().min(1, "Department is required"),
})
export const updateFacultySchema = insertFacultySchema.partial()
export const selectFacultySchema = createSelectSchema(faculty)

export const insertDepartmentSchema = createInsertSchema(departments, {
  name: () => z.string().min(1, "Department name is required"),
  code: () => z.string().min(1, "Department code is required").toUpperCase(),
})
export const updateDepartmentSchema = insertDepartmentSchema.partial()

export const insertCourseSchema = createInsertSchema(courses, {
  courseName: () => z.string().min(1, "Course name is required"),
  courseCode: () => z.string().min(1, "Course code is required").toUpperCase(),
})
export const updateCourseSchema = insertCourseSchema.partial()

export const insertAttendanceSchema = createInsertSchema(attendance, {
  status: () => z.enum(["present", "absent", "late", "excused"]),
})
export const updateAttendanceSchema = insertAttendanceSchema.partial()
