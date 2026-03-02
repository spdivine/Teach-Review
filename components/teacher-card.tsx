import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

type TeacherRatings = {
  clarity: number
  organization: number
  feedback: number
  workload: number
  engagement: number
}

type Teacher = {
  name: string
  school: string
  subjects: string[]
  ratings: TeacherRatings
  reviewCount: number
}

const ratingLabels: { key: keyof TeacherRatings; label: string }[] = [
  { key: "clarity", label: "Clarity" },
  { key: "organization", label: "Organization" },
  { key: "feedback", label: "Feedback" },
  { key: "workload", label: "Workload" },
  { key: "engagement", label: "Engagement" },
]

function getOverall(ratings: TeacherRatings) {
  const values = Object.values(ratings)
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((p) => p.length > 1)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
}

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  const overall = getOverall(teacher.ratings)

  return (
    <Card className="gap-4 transition-shadow hover:shadow-md">
      <CardHeader className="gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback className="bg-secondary text-xs font-medium text-foreground">
              {getInitials(teacher.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-sm">{teacher.name}</CardTitle>
            <CardDescription className="text-xs">
              {teacher.school}
            </CardDescription>
          </div>
          <div className="text-right">
            <span className="text-lg font-semibold text-foreground tabular-nums">
              {overall}
            </span>
            <span className="text-xs text-muted-foreground">/5</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {teacher.subjects.map((subject) => (
            <Badge
              key={subject}
              variant="secondary"
              className="text-[10px] font-normal"
            >
              {subject}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {ratingLabels.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs text-muted-foreground">
              {label}
            </span>
            <Progress
              value={(teacher.ratings[key] / 5) * 100}
              className="h-1.5 flex-1"
            />
            <span className="w-7 text-right text-xs font-medium tabular-nums text-foreground">
              {teacher.ratings[key].toFixed(1)}
            </span>
          </div>
        ))}
        <p className="mt-1 text-xs text-muted-foreground">
          {teacher.reviewCount} reviews
        </p>
      </CardContent>
    </Card>
  )
}
