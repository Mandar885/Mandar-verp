import { relations } from "drizzle-orm"
import { user, session, account } from "./auth"
import { students } from "./students"
import { faculty } from "./faculty"
import { departments } from "./departments"
import { courses } from "./courses"
import { attendance } from "./attendance"
import { roleDefinitions, userRoles } from "./roles"

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  roles: many(userRoles),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}))

export const studentsRelations = relations(students, ({ one, many }) => ({
  authUser: one(user, { fields: [students.authUserId], references: [user.id] }),
  attendanceRecords: many(attendance),
}))

export const facultyRelations = relations(faculty, ({ one, many }) => ({
  authUser: one(user, { fields: [faculty.authUserId], references: [user.id] }),
  courses: many(courses),
  attendanceMarked: many(attendance),
}))

export const departmentsRelations = relations(departments, ({ many }) => ({
  courses: many(courses),
}))

export const coursesRelations = relations(courses, ({ one, many }) => ({
  department: one(departments, { fields: [courses.departmentId], references: [departments.id] }),
  faculty: one(faculty, { fields: [courses.facultyId], references: [faculty.id] }),
  attendanceRecords: many(attendance),
}))

export const attendanceRelations = relations(attendance, ({ one }) => ({
  student: one(students, { fields: [attendance.studentId], references: [students.id] }),
  course: one(courses, { fields: [attendance.courseId], references: [courses.id] }),
  markedBy: one(faculty, { fields: [attendance.markedById], references: [faculty.id] }),
}))

export const roleDefinitionsRelations = relations(roleDefinitions, ({ many }) => ({
  userRoles: many(userRoles),
}))

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(user, { fields: [userRoles.userId], references: [user.id] }),
  roleDefinition: one(roleDefinitions, { fields: [userRoles.roleDefinitionId], references: [roleDefinitions.id] }),
  assignedByUser: one(user, { fields: [userRoles.assignedBy], references: [user.id] }),
}))
