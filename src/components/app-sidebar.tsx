"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  GraduationCapIcon,
  UsersIcon,
  BookOpenIcon,
  CalendarIcon,
  ClipboardCheckIcon,
  IndianRupeeIcon,
  SettingsIcon,
  LayoutDashboardIcon,
  BuildingIcon,
  ClockIcon,
  FileTextIcon,
} from "lucide-react"
import { useSession } from "@/lib/auth-client"

const teams = [
  {
    name: "EXCS College",
    logo: <GraduationCapIcon />,
    plan: "Admin Portal",
  },
]

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboardIcon />,
    isActive: true,
    items: [
      { title: "Overview", url: "/dashboard" },
    ],
  },
  {
    title: "Students",
    url: "/dashboard/students",
    icon: <UsersIcon />,
    items: [
      { title: "All Students", url: "/dashboard/students" },
    ],
  },
  {
    title: "Faculty",
    url: "/dashboard/faculty",
    icon: <BookOpenIcon />,
    items: [
      { title: "All Faculty", url: "/dashboard/faculty" },
    ],
  },
  {
    title: "Courses",
    url: "/dashboard/courses",
    icon: <FileTextIcon />,
    items: [
      { title: "All Courses", url: "/dashboard/courses" },
    ],
  },
  {
    title: "Departments",
    url: "/dashboard/departments",
    icon: <BuildingIcon />,
    items: [
      { title: "All Departments", url: "/dashboard/departments" },
    ],
  },
  {
    title: "Attendance",
    url: "/dashboard/attendance",
    icon: <ClipboardCheckIcon />,
    items: [
      { title: "Records", url: "/dashboard/attendance" },
    ],
  },
  {
    title: "Examinations",
    url: "#",
    icon: <CalendarIcon />,
    items: [
      { title: "Schedule", url: "#" },
      { title: "Results", url: "#" },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: <SettingsIcon />,
    items: [
      { title: "General", url: "#" },
      { title: "Users & Roles", url: "#" },
    ],
  },
]

const quickAccess = [
  {
    name: "Fees & Finance",
    url: "#",
    icon: <IndianRupeeIcon />,
  },
  {
    name: "Timetable",
    url: "#",
    icon: <ClockIcon />,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  const user = {
    name: session?.user?.name ?? "Admin",
    email: session?.user?.email ?? "",
    avatar: session?.user?.image ?? "",
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={quickAccess} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
