"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Students</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            3,456
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-blue">
              <TrendingUpIcon />
              +8.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            New admissions this semester
            <TrendingUpIcon className="size-4 text-blue" />
          </div>
          <div className="text-muted-foreground">
            Across all departments
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Faculty Members</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            248
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-blue">
              <TrendingUpIcon />
              +3.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            12 new hires this year
            <TrendingUpIcon className="size-4 text-blue" />
          </div>
          <div className="text-muted-foreground">
            Full-time and adjunct
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Attendance Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            87.3%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-destructive">
              <TrendingDownIcon />
              -2.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Slight dip this month
            <TrendingDownIcon className="size-4 text-destructive" />
          </div>
          <div className="text-muted-foreground">
            Needs department review
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Fee Collection</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            92.1%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-blue">
              <TrendingUpIcon />
              +5.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Above target collection
            <TrendingUpIcon className="size-4 text-blue" />
          </div>
          <div className="text-muted-foreground">Current semester</div>
        </CardFooter>
      </Card>
    </div>
  )
}
