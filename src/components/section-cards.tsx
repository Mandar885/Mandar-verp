"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-6 px-6 lg:px-10 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="p-0">
          <CardDescription className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Total Students
          </CardDescription>
          <CardTitle className="text-4xl font-light tabular-nums tracking-tight">
            3,456
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            +8.2% from last semester
          </p>
        </CardHeader>
      </Card>
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="p-0">
          <CardDescription className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Faculty Members
          </CardDescription>
          <CardTitle className="text-4xl font-light tabular-nums tracking-tight">
            248
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            12 new hires this year
          </p>
        </CardHeader>
      </Card>
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="p-0">
          <CardDescription className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Attendance Rate
          </CardDescription>
          <CardTitle className="text-4xl font-light tabular-nums tracking-tight">
            87.3%
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            -2.4% from last month
          </p>
        </CardHeader>
      </Card>
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="p-0">
          <CardDescription className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Fee Collection
          </CardDescription>
          <CardTitle className="text-4xl font-light tabular-nums tracking-tight">
            92.1%
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Above target this semester
          </p>
        </CardHeader>
      </Card>
    </div>
  )
}
