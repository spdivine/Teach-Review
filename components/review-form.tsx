"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle } from "lucide-react"

const categories = [
  {
    key: "clarity",
    label: "Clarity of Instruction",
    description: "How clearly does the teacher explain concepts?",
  },
  {
    key: "organization",
    label: "Organization of Class",
    description: "How well is the class structured day-to-day?",
  },
  {
    key: "feedback",
    label: "Feedback Timeliness",
    description: "How quickly do you receive feedback on work?",
  },
  {
    key: "workload",
    label: "Workload Level",
    description: "How manageable is the assigned workload?",
  },
  {
    key: "engagement",
    label: "Classroom Engagement",
    description: "How engaging is the learning environment?",
  },
]

function RatingRow({
  label,
  description,
  value,
  onChange,
}: {
  label: string
  description: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex size-9 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
              value === n
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-secondary text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
            aria-label={`Rate ${label} ${n} out of 5`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}

export function ReviewForm() {
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [comment, setComment] = useState("")
  const [teacherName, setTeacherName] = useState("")

  const allRated = categories.every((c) => ratings[c.key])

  return (
    <section id="review" className="border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Leave Feedback
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Submit a Review
            </h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Classroom Experience Review</CardTitle>
              <CardDescription>
                Rate your experience across five structured categories. One
                review per teacher per semester.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="teacher-name"
                  className="text-sm font-medium text-foreground"
                >
                  Teacher Name
                </label>
                <Input
                  id="teacher-name"
                  placeholder="e.g. Ms. Angela Rivera"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                />
              </div>

              <Separator />

              <div className="flex flex-col gap-5">
                {categories.map((cat) => (
                  <RatingRow
                    key={cat.key}
                    label={cat.label}
                    description={cat.description}
                    value={ratings[cat.key] || 0}
                    onChange={(v) =>
                      setRatings((prev) => ({ ...prev, [cat.key]: v }))
                    }
                  />
                ))}
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="comment"
                  className="text-sm font-medium text-foreground"
                >
                  Describe your classroom experience{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <Textarea
                  id="comment"
                  placeholder="Focus on the learning experience, class structure, and teaching style..."
                  maxLength={500}
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <p className="text-right text-xs tabular-nums text-muted-foreground">
                  {comment.length}/500
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-md border border-border bg-secondary px-4 py-3">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Do not include private information, rumors, or allegations.
                  This platform is for classroom experience feedback only.
                  Reviews are moderated before publishing.
                </p>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={!allRated || !teacherName.trim()}
              >
                Submit Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
